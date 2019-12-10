const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

async function createArea (name) {

    var [ area, created ] = await  models.area.findOrCreate({
        where: { name: name },
        defaults: { name: name }
    })
    return await area
    
}

module.exports = {

    validate: (review) => {

        const name = check('name').exists().withMessage(text.name('area'))
        const id_area = check('id_area').exists().withMessage(text.id('area'))

        switch (review) {
            case 'sign-up':
                return [ name, email, password ]
        }
    },

    signUp:  async(req, res) => {

        const { name, email, password, status } = req.body

        try 
        {
            await models.administrador.create({
                name: name,
                email: email,
                password: password,
                status: (status) ? status : 1 
            });

            successful(res, text.successCreate('administrador'))
            
        } catch (error)  {  returnError(res, error) } 

    },

    signIn: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { name } = req.body

        try {

            await createArea(name)
            successful(res, text.successCreate('area'))
            
        } catch(error) { returnError(res, error) }

    },

    updateAdmin: async (req, res) => {

    },

}