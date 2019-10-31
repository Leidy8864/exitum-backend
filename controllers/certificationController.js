const { putObject, getObject } = require('../libs/aws-s3');
const Sequelize = require('sequelize');
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
           var elements = await user.getCertifications({
               attributes: [ 'id', 'name', 'issuing_company', [ Sequelize.fn( 'Date_format', Sequelize.col('date_expedition'), '%d/%m/%Y' ), 'expedition' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_expiration'), '%d/%m/%Y' ), 'expiration' ], 'document_url'  ]
            } )

        //    var certifications = elements.map(element => {
        //        return {
        //             id: element.id,
        //             name: element.name,
        //             issuing_company: element.issuing_company,
        //             date_expedition : new Date(element.date_expedition).toLocaleDateString(),
        //             date_expiration : new Date(element.date_expiration).toLocaleDateString(),
        //             document_url : element.document_url,
        //        }
        //    })

            return res.status(200).json({ status: true, message: 'OK', data: elements })
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

           if (!req.files) throw('El campo document, que contiene un archivo que valide la certificación.')

           const { document } = req.files

           var [ certificacion, created ] = await  models.certification.findOrCreate({
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
                    date_expiration: new Date(date_expiration)
                }
            })

            if (created) {
                fileName = putObject(NEW_BUCKET_NAME, document);
                certificacion.update({ document_url: fileName })
            } else { throw('Oops! Certificación ya existente') }

            return res.status(200).json({ status: true, message: 'OK', data: {  } })
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

        } catch (error) {
            return res.status(200).json({ status: false, message: (err.message) ? err.message : err, data: {  } })
        }

    }

}