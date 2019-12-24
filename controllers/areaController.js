const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

async function createArea(name) {

    var [area, created] = await models.area.findOrCreate({
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
            case 'create':
                return [name]
        }
    },

    all: async (req, res) => {

        try {

            const area = await models.area.findAll({});
            if (area) {
                return successful(res, 'OK', area)
            } else {
                return res.json({ status: false, message: "No existen areas registradas." })
            }

        } catch (error) { return returnError(res, error) }

    },

    create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { name } = req.body

        try {

            await createArea(name)
            return successful(res, text.successCreate('area'))

        } catch (error) { return returnError(res, error) }

    }
}