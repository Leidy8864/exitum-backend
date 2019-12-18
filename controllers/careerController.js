const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

async function createCareer (name) {

    var [ career, created ] = await  models.career.findOrCreate({
        where: { name: name },
        defaults: { name: name }
    })
    return await career
    
}

module.exports = {

    validate: (review) => {

        const name = check('name').exists().withMessage(text.name('profesión'))
        const id_career = check('id_career').exists().withMessage(text.id('profesión'))

        switch (review) {
            case 'create':
                return [ name ]
        }
    },

    all:  async(req, res) => {

        try 
        {
            const career = await models.career.findAll({});
            return successful(res, 'OK', career)
            
        } catch (error) { return returnError(res, error) } 

    },

    createCareer: createCareer,

    create: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { name } = req.body

        try 
        {
            await createCareer(name)
            return successful(res, text.successCreate('profesión'))
            
        } catch (error) { return returnError(res, error) } 

    }
}