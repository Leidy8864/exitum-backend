const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
const { getAge } = require('./hourController')
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

            // var expereriences = await user.getExperience({
            //     attributes: [ 'id', 'position', [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%Y-%m-%d' ), 'date_start' ], 'company_id',
            //                         [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%Y-%m-%d' ), 'date_end' ], 'description', 'current_job'  ],
            //     include: [ { 
            //         model: models.company,
            //         attributes: ['name']
            //      } ]
            // })

            var element = await models.company.findAll({
                include: [
                    {
                        model: models.experience,
                        where: { user_id: user.id },
                        attributes: [  'id', 'position', [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%Y-%m-%d' ), 'date_start' ],
                                                [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%Y-%m-%d' ), 'date_end' ], 'description', 'current_job' ]
                    },
                ],
                // attributes: [ [ Sequelize.literal(`(SELECT MIN(date_start) FROM experience WHERE )`), 'date_start' ],
                //                      [ Sequelize.literal(`(SELECT MAX(date_end) FROM experience WHERE )`), 'date_end' ] ],
                attributes: [ 'name', [ Sequelize.fn( 'Date_format', Sequelize.fn('min', Sequelize.col('experiences.date_start')), '%Y-%m-%d' ), 'inicio' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.fn('max', Sequelize.col('experiences.date_end')), '%Y-%m-%d' ), 'fin' ] ],
                group: ['id', 'name', 'experiences.id'],
            })

            var data = await Promise.all(element.map(async experience => {
                var start = new Date(experience.experiences[0].date_start);
                var end = new Date(experience.experiences[0].date_end);

                (experience.experiences).forEach(db => {

                    var fecha = new Date(db.date_start)
                    var fecha2 = new Date(db.date_end)

                    if (fecha.getTime() < start.getTime()) start = fecha
                    if (db.current_job == 0) {
                        if (fecha2.getTime() > end.getTime() && end) end = fecha2
                    } else {
                        end = null
                    }

                });
                
                start = `${start.getUTCFullYear()}-${start.getUTCMonth() + 1}-${start.getUTCDate()}`
                end = (end) ? `${end.getUTCFullYear()}-${end.getUTCMonth() + 1}-${end.getUTCDate()}` : null

                return {
                    company_name: experience.name,
                    // start: start,
                    // end: end,
                    time_total: getAge(start, end),
                    detail: experience.experiences
                }
            }))

            return res.status(200).json({ data: data })

        } catch (error) { returnError(res, error) }

    },

    createExperience: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }
        
        const { user_id, position, company_name, description, date_start, date_end } = req.body

        try {

            const user = await existById(models.user, user_id);

            const company = await createCompany(company_name)

            await models.experience.create({
                    user_id: user.id,
                    position: position,
                    company_id: company.id,
                    description: description,
                    date_start: date_start,
                    date_end: date_end,
                    current_job: (date_end) ? 0 : 1
                });

            // if (!created) throw(text.duplicateElement)

            successful(res, text.successCreate('experiencia'))

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