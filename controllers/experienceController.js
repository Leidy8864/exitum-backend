const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
const { existById } = require('./elementController')
const { createCompany } = require('./companyController')
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('./responseController')

module.exports = {

    validate: (method) => {

        var user_id = check('user_id').exists().withMessage(text.id('usuario')).isNumeric().withMessage(text.numeric)

        switch (method) {
            case 'by-user-id':
                return [ user_id ]
            case 'create':
                return [
                    check('date_start').exists().withMessage(text.dateStart),
                    user_id, check('position').exists().withMessage(text.position),
                    check('company_name').exists().withMessage(text.name('empresa')),
                ]
            case 'update':
                return [
                    user_id, check('experience_id').exists().withMessage(text.id('experiencia')).isNumeric().withMessage(text.numeric),
                ]
        }
        
    },

    findUserId: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params

        try {

            const user = await existById(models.user, user_id)

            var expereriences = await user.getExperience({
                attributes: [ 'id', 'position', [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%Y-%m-%d' ), 'date_start' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%Y-%m-%d' ), 'date_end' ], 'description', 'current_job'  ],
                include: [ { 
                    model: models.company,
                    attributes: ['name']
                 } ]
            })

            successful(res, 'OK', expereriences)

        } catch (error) { returnError(res, error) }

    },

    createExperience: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }
        
        const { user_id, position, company_name, description, date_start, date_end } = req.body

        try {

            const user = await existById(models.user, user_id);

            const company = await createCompany(company_name)

            var [experience, created] = await models.experience.findOrCreate({
                where: { [Sequelize.Op.and]: [
                    { user_id: user.id },
                    { company_id: company.id }
                ]},
                defaults: {
                    user_id: user.id,
                    position: position,
                    company_id: company.id,
                    description: description,
                    date_start: date_start,
                    date_end: date_end,
                    current_job: (date_end) ? 0 : 1
                }
            });

            if (!created) throw(text.duplicateElement)

            successful(res, text.successCreate('experiencia'), experience)

        } catch (error) { returnError(res, error) }

    },

    updateExperience: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { experience_id, user_id, position, company_name, description, date_start, date_end, current_job } = req.body

        try {

            var experience = await models.experience.findOne({
                where: {
                    [Sequelize.Op.and]: [
                        { id: experience_id},
                        { user_id: user_id}
                    ]
                },
                include: [ { 
                    model: models.company,
                    attributes: ['name']
                } ],
            });

            if (!experience) throw(text.notFoundElement)

            const company = await createCompany(company_name || experience.company.name)

            await experience.update({
                position: position,
                company_id: company.id,
                description: description,
                date_start: date_start,
                date_end: date_end,
                current_job: (date_end) ? 0 : 1
            });

            successful(res, text.successUpdate('experiencia'), experience)

        } catch (error) { returnError(res, error) }
        
    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id, experience_id } = req.body

        try {

            const experience = await models.experience.findOne({
                where: { 
                    [Sequelize.Op.and]: [
                        { id: experience_id },
                        { user_id: user_id }
                    ]
                }
            })

            if (!experience) throw(text.notFoundElement)

            await experience.destroy()

            successful(res)
            
        } catch (error) { returnError(res, error) }

    }
}