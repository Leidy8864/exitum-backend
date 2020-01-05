const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

async function createOccupation (name) {

    var [ occupation, created ] = await  models.occupation.findOrCreate({
        where: { name: name },
        defaults: { name: name }
    })
    return await occupation
    
}

module.exports = {

    validate: (review) => {

        const name = check('name').exists().withMessage(text.name('ocupación'))
        const id_occupation = check('id_occupation').exists().withMessage(text.id('ocupación'))

        switch (review) {
            case 'create':
                return [ name ]
        }
    },

    all:  async(req, res) => {

        try 
        {
            const occupation = await models.occupation.findAll({
                order: [ ['name', 'ASC'] ]
            });
            return successful(res, 'OK', occupation)
            
        } catch (error) { return returnError(res, error) }

    },

    createOccupation: createOccupation,

    create: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { name } = req.body

        try 
        {
            await createOccupation(name)
            return successful(res, text.successCreate('area'))
            
        } catch (error) { return returnError(res, error) }

    }
}