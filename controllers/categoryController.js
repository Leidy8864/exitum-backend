const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

async function createCategory (name) {

    var [ category, created ] = await  models.category.findOrCreate({
        where: { name: name },
        defaults: { name: name }
    })
    return await category
    
}

module.exports = {

    validate: (review) => {

        const name = check('name').exists().withMessage(text.name('categoria'))
        const id_category = check('id_category').exists().withMessage(text.id('categoria'))

        switch (review) {
            case 'create':
                return [ name ]
        }
    },

    createCategory: createCategory,

    all:  async(req, res) => {

        try {

            var category = await models.category.findAll({});
            return successful(res, 'OK', category)

        } catch (error) { return returnError(res, error) } 

    },

    search: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { name } = req.body

        try {

            name = name.toLowerCase()
    
            var category = await createCategory(name)

            return successful(res, 'OK', category)

        } catch (error) { return returnError(res, error) } 

    }


}