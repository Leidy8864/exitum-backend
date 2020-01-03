const text = require('../libs/text')
const s3 = require('../libs/aws-s3');
const Sequelize = require('sequelize');
const index = require('../config/index');
const models = require('../models/index')
const { putObject, getObject } = require('../libs/aws-s3');
const { createCompany } = require('./companyController')
const { createSpeciality } = require('./specialityController')
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('./responseController')
const { createCertificationName } = require('./certificationNameController')
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/documentos/certifications';

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
                    check('date_expedition').exists().withMessage(text.dateExpedition),
                    check('specialities').exists().withMessage('Son necesarias las especialidades.')
                ]
            case 'update':
                return [ user_id, check('certification_id').exists().withMessage(text.id('certificado')).isNumeric().withMessage(text.numeric) ]
            case 'download':
                return [ check('file_name').exists().withMessage(text.name('documento')) ]
        }
    },

    findUserId: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params

        try 
        {
           const user = await existById(models.user, user_id)

           var elements = await user.getCertifications({
               attributes: [ 'id', 'company_id', [ Sequelize.fn( 'Date_format', Sequelize.col('date_expedition'), '%Y-%m-%d' ), 'date_expedition' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_expiration'), '%Y-%m-%d' ), 'date_expiration' ], 'document_url'
                                ],
                include: [
                    { model: models.company },
                    { model: models.certification_name },
                ]
            })

            const certifications = await Promise.all(elements.map(async element => {
                return {
                    id: element.id,
                    name: element.certification_name.name,
                    company_id: element.company_id,
                    date_expedition : element.date_expedition,
                    date_expiration : element.date_expiration,
                    url : (element.document_url  && element.document_url != '') ? text.downloadDocument(element.document_url) : null,
                    issuing_company: element.company.name
               }
            } ))

            return successful(res, 'OK', certifications)

        } catch (error) { return returnError(res, error) }

    },

    create:  async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id, name, issuing_company, date_expedition, date_expiration, specialities } = req.body

        try 
        {
           const user = await existById(models.user, user_id)
           var fileName = null

           if (req.files) 
           {
                const { document } = req.files
                fileName = putObject(NEW_BUCKET_NAME, document);
           }

           const company = await createCompany(issuing_company)
           const certification_name = await createCertificationName(name)

           var [ certification, created ] = await  models.certification.findOrCreate({
                where: {
                    [ Sequelize.Op.and ] : [
                        { user_id: user.id },
                        { certification_name_id: certification_name.id },
                        { company_id: company.id },
                        { date_expedition: new Date(date_expedition) }
                    ]
                },
                defaults: {
                    user_id: user.id,
                    certification_name_id: certification_name.id,
                    company_id: company.id,
                    date_expedition: new Date(date_expedition),
                    date_expiration: new Date(date_expiration),
                    document_url: fileName
                }
            })

            if (!created) throw(text.duplicateElement)

            var specialities_id = await  Promise.all(specialities.map(async speciality => {
                var speciality_id = await createSpeciality(speciality)
                return await speciality_id.id
            }))

            await certification.addToCertificationSpecialities(specialities_id)

            return successful(res, text.successCreate('certificado'))
            
        } catch (error) { return returnError(res, error) }

    },

    downloadFile: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { file_name } = req.params

        try {

            res.attachment(file_name);
            var  fileStream = getObject(NEW_BUCKET_NAME, file_name)
            fileStream.pipe(res)

        } catch (error) { return returnError(res, error) }

        // Guardar en proyecto
        // var s3 = new AWS.S3({apiVersion: '2006-03-01'});
        // var params = {Bucket: 'myBucket', Key: 'myImageFile.jpg'};
        // var file = require('fs').createWriteStream(__dirname+'/path/to/file.jpg');
        // s3.getObject(params).createReadStream().pipe(file);
    },

    updateUserCertification: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id, certification_id, name, issuing_company, date_expedition, date_expiration, specialities } = req.body

        try 
        {
            const certification = await models.certification.findOne({
                where: {
                    [ Sequelize.Op.and ] : [
                        { id: certification_id },
                        { user_id: user_id }
                    ]
                },
                include: [
                    { model: models.company, attributes: ['name'] },
                    { model: models.certification_name, attributes: ['name'] },
                ]
            })

            if (!certification) throw(text.notFoundElement)

            const company = await createCompany(issuing_company || certification.company.name)
            const certification_name = await createCertificationName(name || certification.certification_name.name)

            var fileName = certification.document_url
           
            if (req.files) 
            {
                if (certification.document_url) s3.deleteObject(NEW_BUCKET_NAME, (certification.document_url).split('/')[5])
                
                const { document } = req.files
                fileName = putObject(NEW_BUCKET_NAME, document);

           }

            await certification.update({
                user_id: user_id,
                certification_name_id: certification_name.id,
                company_id: company.id,
                date_expedition: (date_expedition) ? new Date(date_expedition) : certification.date_expedition,
                date_expiration: (date_expiration) ? new Date(date_expiration) : certification.date_expiration,
                document_url: fileName
            })

            if (specialities instanceof Array) 
           {
                await models.certification_speciality.destroy({ where: { certification_id: certification.id } })
                var specialities_id = await  Promise.all(specialities.map(async speciality => {
                    var speciality_id = await createSpeciality(speciality)
                    return await speciality_id.id
                }))
    
                await certification.addToCertificationSpecialities(specialities_id)
           }

            return successful(res, text.successUpdate('certificado'))

        } catch (error) { return returnError(res, error) }

    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        try 
        {
            const { user_id, certification_id } = req.body

            var certification = await models.certification.findOne({
                where: { 
                    [ Sequelize.Op.and ] : [
                        { id: certification_id },
                        { user_id: user_id }
                    ]
                }
            })

            if (!certification) throw(text.notFoundElement)

            if (certification.document_url  && certification.document_url != '') {
                s3.deleteObject(NEW_BUCKET_NAME, (certification.document_url).split('/')[5]);
            }

            await models.certification_speciality.destroy({ where: { certification_id: certification.id } })
            await certification.destroy()

            return successful(res, text.successDelete('certificado'))
            
        } catch (error) { return returnError(res, error) }

    }

}