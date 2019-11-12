const text = require('../libs/text')
const s3 = require('../libs/aws-s3');
const Sequelize = require('sequelize');
const index = require('../config/index');
const models = require('../models/index')
const { putObject, getObject } = require('../libs/aws-s3');
const { createCompany } = require('./companyController')
const { existById } = require('../controllers/elementController');
const  { successful, returnError } = require('./responseController')
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/documentos/certifications';

const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (certification) => {

        var user_id = check('user_id').exists().withMessage(text.id('usuario')).isNumeric().withMessage(text.numeric)

        switch (certification) {
            case 'by-user-id':
                return [ user_id ]
            case 'create':
                return [
                    user_id, check('name').exists().withMessage(text.name('certificado')),
                    check('issuing_company').exists().withMessage(text.name('empresa')),
                    check('date_expedition').exists().withMessage(text.date_expedition)
                ]
            case 'update':
                return [ user_id, check('certification_id').exists().withMessage(text.id('certificado')).isNumeric().withMessage(text.numeric) ]
            case 'download':
                return [ check('file_name').exists().withMessage(text.name('documento')) ]
        }
    },

    findUserId: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validation_data, errors.array()) }

        const { user_id } = req.params

        try {

           const user = await existById(models.user, user_id)

           var elements = await user.getCertifications({
               attributes: [ 'id', 'name', 'company_id', [ Sequelize.fn( 'Date_format', Sequelize.col('date_expedition'), '%Y-%m-%d' ), 'date_expedition' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_expiration'), '%Y-%m-%d' ), 'date_expiration' ], 'document_url'
                                ],
                include: [
                    {
                        model: models.company
                    }
                ]
            } )

            const valor = await Promise.all(elements.map(async element => {
                return {
                    id: element.id,
                    name: element.name,
                    company_id: element.company_id,
                    date_expedition : element.date_expedition,
                    date_expiration : element.date_expiration,
                    url : (element.document_url  && element.document_url != '') ? text.download_document(element.document_url) : null,
                    issuing_company: element.company.name
               }
            } ))

            successful(res, 'OK', valor)

        } catch (error) { returnError(res, error) }

    },

    create:  async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validation_data, errors.array()) }

        const { user_id, name, issuing_company, date_expedition, date_expiration } = req.body

        try {

           const user = await existById(models.user, user_id)
           var fileName = null

           if (req.files) {
                const { document } = req.files
                fileName = putObject(NEW_BUCKET_NAME, document);
           }

           const company = await createCompany(issuing_company)

           var [ certification, created ] = await  models.certification.findOrCreate({
                where: {
                    [ Sequelize.Op.and ] : [
                        { user_id: user.id },
                        { name: name },
                        {  company_id: company.id },
                        { date_expedition: new Date(date_expedition) }
                    ]
                },
                defaults: {
                    user_id: user.id,
                    name: name,
                    company_id: company.id,
                    date_expedition: new Date(date_expedition),
                    date_expiration: new Date(date_expiration),
                    document_url: fileName
                }
            })

            if (!created) throw(text.duplicate_element)

            const data = {
                id: certification.id,
                name: certification.name,
                company_id: company.id,
                date_expedition : certification.date_expedition,
                date_expiration : certification.date_expiration,
                url : (certification.document_url  && certification.document_url != '') ? text.download_document(certification.document_url): null,
            } 

            successful(res, text.success_create('certificado'), data)
            
        } catch (error) { returnError(res, error) }

    },

    downloadFile: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validation_data, errors.array()) }

        const { file_name } = req.params

        try {

            res.attachment(file_name);
            var  fileStream = getObject(NEW_BUCKET_NAME, file_name)
            fileStream.pipe(res)

        } catch (error) { returnError(res, error) }

        // Guardar en proyecto
        // var s3 = new AWS.S3({apiVersion: '2006-03-01'});
        // var params = {Bucket: 'myBucket', Key: 'myImageFile.jpg'};
        // var file = require('fs').createWriteStream(__dirname+'/path/to/file.jpg');
        // s3.getObject(params).createReadStream().pipe(file);
    },

    updateUserCertification: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validation_data, errors.array()) }

        const { user_id, certification_id, name, issuing_company, date_expedition, date_expiration } = req.body

        try {

            const certification = await models.certification.findOne({
                where: {
                    [ Sequelize.Op.and ] : [
                        { id: certification_id },
                        { user_id: user_id }
                    ]
                },
                include: [
                    {
                        model: models.company,
                        attributes: ['name']
                    }
                ]
            })

            if (!certification) throw(text.not_found_element)

            const company = await createCompany(issuing_company || certification.company.name)

            var fileName = certification.document_url
           
            if (req.files) {

                if (certification.document_url) s3.deleteObject(NEW_BUCKET_NAME, (certification.document_url).split('/')[5])
                
                const { document } = req.files
                fileName = putObject(NEW_BUCKET_NAME, document);

           }

            await certification.update({
                user_id: user_id,
                name: name,
                company_id: company.id,
                date_expedition: new Date(date_expedition),
                date_expiration: new Date(date_expiration),
                document_url: fileName
            })

            const data = {
                id: certification.id,
                name: certification.name,
                company_id: certification.company_id,
                date_expedition : certification.date_expedition,
                date_expiration : certification.date_expiration,
                url : (certification.document_url  && certification.document_url != '') ? text.download_document(certification.document_url) : null,
                issuing_company: certification.company.name
            } 

            successful(res, text.success_update('certificado'), data)

        } catch (error) { returnError(res, error) }

    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validation_data, errors.array()) }

        try {

            const { user_id, certification_id } = req.body

            var certification = await models.certification.findOne({
                where: { 
                    [ Sequelize.Op.and ] : [
                        { id: certification_id },
                        { user_id: user_id }
                    ]
                }
            })

            if (!certification) throw(text.not_found_element)

            if (certification.document_url  && certification.document_url != '') {
                s3.deleteObject(NEW_BUCKET_NAME, (certification.document_url).split('/')[5]);
            }
    
            await certification.destroy()

            successful(res, text.success_delete('certificado'))
            
        } catch (error) { returnError(res, error) }

    }

}