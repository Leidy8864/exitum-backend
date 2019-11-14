const text = require('../libs/text');
const Sequelize = require('sequelize');
const index = require('../config/index');
const models = require('../models/index')
const { putObject, deleteObject } = require('../libs/aws-s3');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/study-center-icons';

const { check, validationResult } = require('express-validator');

async function createUniversity (name) {

    var [ university, created ] = await  models.university.findOrCreate({
        where: { university: name },
        defaults: {
            university: name
        }
    })

    return await university
}

module.exports = {

    createUniversity: createUniversity,

    create: async(req, res) => {

        const { name } = req.body

        try {
            
            const university = await createUniversity(name)

            if (req.files) {
                var fileName = putObject(NEW_BUCKET_NAME, req.files.icon);
                university.update({ icon: fileName })
            }

            successful(res, text.successCreate('universidad'))

        } catch (error) { returnError(res, error) }

    },
    
    all: async(req, res) => {

        try {

            const university = await models.university.findAll({})
            successful(res, 'OK', university)

        }catch (error) { returnError(res, error) }
    }
}

