const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
const { existById } = require('./elementController')
const { createUniversity } = require('./universityController')
const { check, validationResult } = require('express-validator');
const { createOccupation } = require('./occupationController');
const  { successful, returnError } = require('./responseController')

module.exports = {

    validate: (method) => {

        var user_id = check('user_id').exists().withMessage(text.id('usuario')).isNumeric().withMessage(text.numeric)

        switch (method) {
            case 'by-user-id':
                return [ user_id ]
            case 'create':
                return [
                    check('university_name').exists().withMessage(text.name('universidad')),
                    check('description').exists().withMessage(text.description),
                    check('date_start').exists().withMessage(text.dateStart),
                    check('date_end').exists().withMessage(text.dateEnd)
                ]
            case 'update':
                return [
                    user_id, check('education_id').exists().withMessage(text.id('educación')).isNumeric().withMessage(text.numeric),
                ]
        }

    },

    findUserId: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params

        try {

            const user = await existById(models.user, user_id)

            var education = await user.getEducation({
                attributes: [ 'id', [ Sequelize.fn('max', Sequelize.col('occupation.name') ), 'description' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%Y-%m-%d' ), 'date_start' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%Y-%m-%d' ), 'date_end' ] ],
                include: [ 
                    { model: models.university },
                    { model: models.occupation },
                ],
                group: [ 'id', 'occupation.name' ]
            })

            successful(res, 'Ok', education)

        } catch (error) { returnError(res, error) }
        
    },

    createEducation: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id, university_name, description, date_start, date_end } = req.body

        try {
            
            const user = await existById(models.user, user_id);
            const university = await createUniversity(university_name)
            const occupation = await createOccupation(description)

            var [ education, created ] = await models.education.findOrCreate({
                    where: { [Sequelize.Op.and]: [
                        { user_id: user.id },
                        { university_id: university.id },
                        { occupation_id: occupation.id }
                    ]},
                    defaults: {
                        user_id: user.id,
                        occupation_id: occupation.id,
                        date_start: date_start,
                        date_end: date_end,
                        university_id: university.id
                    }
                });

            if (!created) throw(text.duplicateElement)

            successful(res, text.successCreate('educación'), education)

        } catch (error) { returnError(res, error) }
        
    },

    updateEducation: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { education_id, user_id, university_name, description, date_start, date_end } = req.body
        
        try {

            var education = await models.education.findOne({
                where: {
                    [Sequelize.Op.and]: [
                        { id: education_id},
                        { user_id: user_id}
                    ]
                },
                include: [ 
                    { model: models.university, attributes: ['university'] },
                    { model: models.occupation, attributes: ['name'] },
                ],
            });

            if (!education) throw(text.notFoundElement)

            const university = await createUniversity(university_name || education.university.university)
            const occupation = await createOccupation(description || education.occupation.name)

            await education.update({
                occupation_id: occupation.id,
                date_start: date_start,
                date_end: date_end,
                university_id: university.id
            });

            successful(res, text.successUpdate('educación'))

        } catch (error) { returnError(res, error) }
        
    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id, education_id } = req.body

        try {

            const education = await models.education.findOne({
                where: { 
                    [Sequelize.Op.and]: [
                        { id: education_id },
                        { user_id: user_id }
                    ]
                }
            })

            if (!education) throw(text.notFoundElement)

            await education.destroy()

            successful(res, text.successUpdate('educación'))
            
        } catch (error) { returnError(res, error) }

    }

}