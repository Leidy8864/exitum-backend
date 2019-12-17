const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

async function createCertificationName (name) {

    var [ certification_name, created ] = await  models.certification_name.findOrCreate({
        where: { name: name },
        defaults: { name: name }
    })
    return await certification_name
    
}

module.exports = {

    validate: (review) => {

        const name = check('name').exists().withMessage(text.name('certificación'))

        switch (review) {
            case 'create':
                return [ name ]
        }
    },

    all:  async(req, res) => {

        try {

            const certification_name = await models.certification_name.findAll({});
            successfulreturn (res, 'OK', certification_name)
            
        } catch (error) { return returnError(res, error) }

    },

    createCertificationName: createCertificationName,

    create: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { name } = req.body

        try {

            await createCertificationName(name)
            return successful(res, text.successCreate('nombre certificación'))
            
        } catch (error) { return returnError(res, error) }

    }
}