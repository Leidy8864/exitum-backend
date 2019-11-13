const text = require('../libs/text');
const Sequelize = require('sequelize');
const index = require('../config/index');
const models = require('../models/index')
const { putObject, deleteObject } = require('../libs/aws-s3');
const { existById } = require('../controllers/elementController');
const  { successful, returnError } = require('./responseController')
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/company-icons';

const { check, validationResult } = require('express-validator');

async function createCompany (name) {

    var [ company, created ] = await  models.company.findOrCreate({
        where: { name: name },
        defaults: {
            name: name,
        }
    })
    return await company
}

module.exports = {
    validate: (company) => {

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

        switch (company) {
            case 'listById':
                return [ user_id ]
            case 'create':
                return [ user_id, name, issuing_company, date_expedition, date_expiration ]
            case 'download':
                return [ fileName ]
        }
    },

    createCompany: createCompany,

    create: async(req, res) => {

        const { name } = req.body

        try {
            
            const company = await createCompany(name)

            if ( !created ) deleteObject(NEW_BUCKET_NAME, company.icon);
            if (req.files) {
                var fileName = putObject(NEW_BUCKET_NAME, req.files.icon);
                company.update({
                    icon: fileName
                })
            }

            successful(res, text.successCreate('empresa'))

        } catch (error) { returnError(res, error) }

    },
    
    all: async(req, res) => {

        try {

            const company = await models.company.findAll({})
            successful(res, 'OK', company)

        } catch (err) { returnError(res, error) }

    }
}

