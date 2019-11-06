const { putObject, deleteObject } = require('../libs/aws-s3');
const Sequelize = require('sequelize');
const models = require('../models/index')
const { existById } = require('../controllers/elementController');
const index = require('../config/index');
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

            if ( !created ) deleteObject(NEW_BUCKET_NAME, university.icon);
            if (req.files) {
                var fileName = putObject(NEW_BUCKET_NAME, req.files.icon);
                university.update({
                    icon: fileName
                })
            }

           return res.status(200).json({ status: true, message: 'OK', data: {  } })

        }
        catch (err) {
            return res.status(200).json({ status: false, message: (err.message) ? error.message : error, data: {  } })
        }
    },
    
    all: async(req, res) => {

        try {

            const university = await models.university.findAll({})
           return res.status(200).json({ status: true, message: 'OK', data: university })

        }catch (err) {
            return res.status(200).json({ status: false, message: err.message, data: {  } })
        }
    }
}

