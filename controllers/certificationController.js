const { putObject, getObject } = require('../libs/aws-s3');
const Sequelize = require('sequelize');
const s3 = require('../libs/aws-s3');
const index = require('../config/index');
const models = require('../models/index')
const { existById } = require('../controllers/elementController');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/documentos/certifications';

const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (certificacion) => {

        var user_id = check('user_id')
            .exists().withMessage('Es necesario el id del usuario.')
        var name = check('name')
            .exists().withMessage("Es necesario el nombre de la certificación.")
        var issuing_company = check('issuing_company')
            .exists().withMessage("Es necesario el nombre la empresa que emitió el certificado.")
        var date_expedition = check('date_expedition')
            .exists().withMessage("Es necesario una fecha de expedición del certificado.")
        var date_expiration = check('date_expiration')
            .exists().withMessage("Es necesario una fecha de vencimiento del certificado.")
        var fileName = check('fileName')
            .exists().withMessage("Es necesario nombre del certificado.")
        var certification_id = check('certification_id')
            .exists().withMessage("Es necesario el ID del certificado.")

        switch (certificacion) {
            case 'listById':
                return [ user_id ]
            case 'create':
                return [ user_id, name, issuing_company, date_expedition, date_expiration ]
            case 'update':
                return [ user_id, name, issuing_company, date_expedition, date_expiration, certification_id ]
            case 'download':
                return [ fileName ]
        }
    },

    listById: async(req, res) => {

        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.json({ status: false, message: 'Campos incorrectos', data: errors.array() }) }

        const { user_id } = req.params

        try {

           const user = await existById(models.user, user_id)
        //    var elements = await user.getCertifications({
        //        attributes: [ 'id', 'name', 'issuing_company', [ Sequelize.fn( 'Date_format', Sequelize.col('date_expedition'), '%Y-%m-%d' ), 'expedition' ],
        //                             [ Sequelize.fn( 'Date_format', Sequelize.col('date_expiration'), '%Y-%m-%d' ), 'expiration' ],
        //                             [Sequelize.fn('CONCAT', 'http://35.175.241.103:8081/certifications/download/', Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('document_url'), '/',  '-1' )), 'url']    
        //                         ]
        //     } )
           var elements = await user.getCertifications({
               attributes: [ 'id', 'name', 'issuing_company', [ Sequelize.fn( 'Date_format', Sequelize.col('date_expedition'), '%Y-%m-%d' ), 'date_expedition' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_expiration'), '%Y-%m-%d' ), 'date_expiration' ], 'document_url'
                                ]
            } )


            const valor = await Promise.all(  elements.map(  async element => {
                return {
                    id: element.id,
                    name: element.name,
                    issuing_company: element.issuing_company,
                    date_expedition : element.date_expedition,
                    date_expiration : element.date_expiration,
                    url : (element.document_url || element.document_url == null) ? `http://35.175.241.103:8081/certifications/download/${(element.document_url).split('/')[6]}`:'' 
               }
            } ))

            return res.status(200).json({ status: true, message: 'OK', data: valor })
        } catch (err) {
            return res.status(200).json({ status: false, message: err.message, data: {  } })
        }

    },

    create:  async(req, res) => {

        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.json({ status: false, message: 'Campos incorrectos', data: errors.array() }) }

        const { user_id, name, issuing_company, date_expedition, date_expiration } = req.body

        try {

           const user = await existById(models.user, user_id)
           var fileName = null

           if (req.files) {
                const { document } = req.files
                fileName = putObject(NEW_BUCKET_NAME, document);
           }

           var [ certification, created ] = await  models.certification.findOrCreate({
                attributes: [ 'id', 'name', 'issuing_company', [ Sequelize.fn( 'Date_format', Sequelize.col('date_expedition'), '%Y-%m-%d' ), 'date_expedition' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_expiration'), '%Y-%m-%d' ), 'date_expiration' ], 'document_url'
                                ],
                where: {
                    [ Sequelize.Op.and ] : [
                        { user_id: user.id },
                        { name: name },
                        { issuing_company: issuing_company },
                        { date_expedition: new Date(date_expedition) }
                    ]
                },
                defaults: {
                    user_id: user.id,
                    name: name,
                    issuing_company: issuing_company,
                    date_expedition: new Date(date_expedition),
                    date_expiration: new Date(date_expiration),
                    document_url: fileName
                }
            })

            if (!created) throw('Oops! Certificación ya existente')

            const data = {
                id: certification.id,
                name: certification.name,
                issuing_company: certification.issuing_company,
                date_expedition : certification.date_expedition,
                date_expiration : certification.date_expiration,
                url : (certification.document_url || certification.document_url == null) ? `http://35.175.241.103:8081/certifications/download/${(certification.document_url).split('/')[6]}`:'' 
            } 

            return res.status(200).json({ status: true, message: 'OK', data: data })
            
        } catch (err) {
            return res.status(200).json({ status: false, message: (err.message) ? err.message : err, data: {  } })
        }
    },

    downloadFile: async(req, res) => {

        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.json({ status: false, message: 'Campos incorrectos', data: errors.array() }) }

        const { fileName } = req.params

        try {

            res.attachment(fileName);
            var  fileStream = getObject(NEW_BUCKET_NAME, fileName)
            fileStream.pipe(res)

        } catch (error) {
            return res.status(200).json({ status: false, message: error.message, data : {  } })
        }


        // try {

            // res.attachment(fileName);
            // var element = getObject(NEW_BUCKET_NAME, fileName)
            // var element = await getObject(NEW_BUCKET_NAME, fileName)

            // res.setHeader('Content-disposition', 'attachment; filename=dedede.pdf')
            // res.setHeader('Content-length', element.ContentLength)
            // res.end(data.body)

            // element.createReadStream()
            // console.log(element)
            // console.log(fileStream)
            // element.pipe(res)

            // return res.status(200).json({ status: true, message: 'OK', data : { element } })

        // } catch (error) {
        //     return res.status(200).json({ status: false, message: error.message, data : {  } })
        // }

        // Guardar en proyecto
        // var s3 = new AWS.S3({apiVersion: '2006-03-01'});
        // var params = {Bucket: 'myBucket', Key: 'myImageFile.jpg'};
        // var file = require('fs').createWriteStream(__dirname+'/path/to/file.jpg');
        // s3.getObject(params).createReadStream().pipe(file);
    },

    update: async (req, res) => {

        const { user_id, certification_id, name, issuing_company, date_expedition, date_expiration } = req.body

        try {

            const user = await existById(models.user, user_id)
            const certification = await models.certification.findByPk(certification_id)
            var fileName = certification.document_url
           
            if (req.files) {
                fileName = putObject(NEW_BUCKET_NAME, document);
           }

            certification.update({
                user_id: user.id,
                name: name,
                issuing_company: issuing_company,
                date_expedition: new Date(date_expedition),
                date_expiration: new Date(date_expiration),
                document_url: fileName
            })

            const data = {
                id: certification.id,
                name: certification.name,
                issuing_company: certification.issuing_company,
                date_expedition : certification.date_expedition,
                date_expiration : certification.date_expiration,
                url : (certification.document_url || certification.document_url == null) ? `http://35.175.241.103:8081/certifications/download/${(certification.document_url).split('/')[6]}`:'' 
            } 

            return res.status(200).json({ status: true, message: 'OK', data: data })

        } catch (error) {
            return res.status(200).json({ status: false, message: (err.message) ? err.message : err, data: {  } })
        }

    },

    delete: async (req, res) => {

        try {

            const { certification_id } = req.body

            var certification = await models.certification.findByPk(certification_id)

            if (certification == null || certification === undefined) {
                throw('Ooop! No se encontraron los registrados.')
            }

            if (certification.document_url != null) {
                s3.deleteObject(NEW_BUCKET_NAME, "cb843490-fbcc-11e9-95db-0123456789abTarea.pptx");
            }
    
            await certification.destroy()

            return res.status(200).json({ status: true, message: "Skill borrado correctamente", data: {  } });
            
        } catch (error) {
            res.status(200).json({ status: false, message: (error.message) ? error.message : error, data:  {  } });
        }

    }

}