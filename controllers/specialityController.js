const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index')
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');


async function createSpeciality (name) {

    var [ speciality, created ] = await  models.speciality.findOrCreate({
        where: { name: name },
        defaults: { name: name }
    })

    return await speciality
}

module.exports = {

    validate: (review) => {

        const name = check('name').exists().withMessage(text.name('especialidad'))
        const id_speciality = check('id_speciality').exists().withMessage(text.id('especialidad'))

        switch (review) {
            case 'create':
                return [ name ]
        }
    },

    createSpeciality: createSpeciality,

    all: async (req, res) => {

        try {

            const speciality = await models.speciality.findAll({});
            if (speciality) {
                return successful(res, 'OK', speciality)
            } else {
                return successful(res, '"No existen especialidades registradas.')
            }

        } catch (error) { return returnError(res, error) }

    },

    create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { name } = req.body

        try {

            await createSpeciality(name)
            return successful(res, text.successCreate('area'))

        } catch (error) { return returnError(res, error) }

    }

}