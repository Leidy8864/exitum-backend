const text = require('../libs/text');
const index = require('../config/index');
const models = require('../models/index');
const { putObject } = require('../libs/aws-s3');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/step-icons';

module.exports = {

    validate: (method) => {

        const step = check('step').exists().withMessage(text.tip)
        const step_id = check('step_id').exists().withMessage(text.id('tip'))

        switch (method) {
            case 'create':
                return [ step ]
            case 'update':
                return [ step_id ]
            case 'delete':
                return [ step_id ]
        }

    },
    all:  async(req, res) => {

        try 
        {
            const step = await models.step.findAll({});
            return successful(res, 'OK', step)
            
        } catch (error) { return returnError(res, error) }

    },

    create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { step } = req.body
        var fileName = null

        try 
        {
            if (req.files) 
           {
                const { icon } = req.files
                fileName = putObject(NEW_BUCKET_NAME, icon);
           }

            await models.step.create({
                step: step,
                icon: fileName
            })

            return successful(res, text.successCreate('step'))
            
        } catch (error) { return returnError(res, error) }

    },

    update: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { step, step_id } = req.body

        try 
        {
            var tip_data = await existById(models.tip, step_id)
            var fileName = tip_data.icon

            if (req.files) 
           {
                if (certification.document_url) s3.deleteObject(NEW_BUCKET_NAME, (tip_data.icon).split('/')[5])
                
                const { icon } = req.files
                fileName = putObject(NEW_BUCKET_NAME, icon);
           }

            tip_data.update({
                step: step,
                icon: fileName
            })

            return successful(res, text.successUpdate('step'))

        } catch (error) { return returnError(res, error) }

    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { tip_id } = req.body

        try 
        {
            var tip_data = await existById(models.tip, tip_id)
            await tip_data.destroy()

            return successful(res, text.successDelete('step'))

        } catch (error) { return returnError(res, error) }

    }
}