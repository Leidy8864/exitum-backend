const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
const { getAge } = require('./hourController')
const { existById } = require('./elementController')
const { createOccupation } = require('./occupationController')
const { createCompany } = require('./companyController')
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('./responseController')

module.exports = {

    validate: (method) => {

        const user_id = check('user_id').exists().withMessage(text.id('usuario')).isNumeric().withMessage(text.numeric)
        const experience_id = check('experience_id').exists().withMessage(text.id('experiencia')).isNumeric().withMessage(text.numeric)
        const date_start = check('date_start').exists().withMessage(text.dateStart)
        const position = check('position').exists().withMessage(text.position)
        const company_name =  check('company_name').exists().withMessage(text.name('empresa'))
        const category_id =  check('category_id').exists().withMessage(text.category('experiencia'))
        
        switch (method) {
            case 'by-user-id':
                return [ user_id ]
            case 'by-experience-id':
                return [ experience_id ]
            case 'create':
                return [ date_start, user_id, position, company_name, category_id ]
            case 'update':
                return [ user_id, experience_id ]
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
                        attributes: [  'id', [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%Y-%m-%d' ), 'date_start' ],
                                                [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%Y-%m-%d' ), 'date_end' ], 'description', 'current_job'
                                            ],
                        include: [
                            { model: models.occupation }
                        ],
                        order: [ 'date_start', 'DESC' ]
                    },
                ],
                // attributes: [ [ Sequelize.literal(`(SELECT MIN(date_start) FROM experience WHERE )`), 'date_start' ],
                //                      [ Sequelize.literal(`(SELECT MAX(date_end) FROM experience WHERE )`), 'date_end' ] ],
                attributes: [ 'name', [ Sequelize.fn( 'Date_format', Sequelize.fn('min', Sequelize.col('experiences.date_start')), '%Y-%m-%d' ), 'inicio' ],
                    [ Sequelize.fn( 'Date_format', Sequelize.fn('max', Sequelize.col('experiences.date_end')), '%Y-%m-%d' ), 'fin' ] ],
                group: ['id', 'name', 'experiences.id'],
                order: [ [ { model: models.experience }, 'date_start', 'DESC' ] ],
            })

            var data = await Promise.all(element.map(async experience => {
                var start = new Date(experience.experiences[0].date_start);
                var end = new Date(experience.experiences[0].date_end);

                (experience.experiences).forEach(db => {

                    var fecha = new Date(db.date_start)
                    var fecha2 = new Date(db.date_end)

                    if (fecha.getTime() < start.getTime()) start = fecha
                    if (db.current_job == 0 && end) {
                        if (fecha2.getTime() > end.getTime()) end = fecha2
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
                    detail: (experience.experiences).map(exp => {
                        return {
                            id: exp.id,
                            date_start: exp.date_start,
                            date_end: exp.date_end,
                            description: exp.description,
                            current_job: exp.current_job,
                            position: exp.occupation.name
                        }
                    })
                }
            }))

            successful(res, 'OK', data)

        } catch (error) { returnError(res, error) }

    },

    show: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { experience_id } = req.params

        try {

            await existById(models.experience, experience_id)

            const experience = await models.experience.findByPk(experience_id, {
                attributes: [ 'id', [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%Y-%m-%d' ), 'date_start' ], 'company_id',
                                        [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%Y-%m-%d' ), 'date_end' ], 'description', 'current_job',
                                        [ Sequelize.fn('max', Sequelize.col('company.name') ), 'company_name' ], 
                                        [ Sequelize.fn('max', Sequelize.col('occupation.name') ), 'position' ] ],
                include: [ 
                    { model: models.company, attributes: [ 'name', 'id' ] },
                    { model: models.occupation, attributes: [ 'name', 'id' ] },
                    { model: models.category, attributes: [ 'name', 'id' ] },
                 ]
            })

            successful(res, 'OK', experience)
            
        } catch (error) { returnError(res, error) }

    },

    createExperience: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }
        
        const { user_id, position, company_name, description, date_start, date_end, category_id } = req.body

        try {

            const user = await existById(models.user, user_id);
            const occupation = await createOccupation(position)
            const company = await createCompany(company_name)

            await models.experience.create({
                    user_id: user.id,
                    occupation_id: occupation.id,
                    date_end: date_end,
                    date_start: date_start,
                    description: description,
                    category_id: category_id,
                    company_id: company.id,
                    current_job: (date_end) ? 0 : 1
                });

            // if (!created) throw(text.duplicateElement)

            successful(res, text.successCreate('experiencia'))

        } catch (error) { returnError(res, error) }

    },

    updateExperience: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { experience_id, user_id, position, company_name, description, date_start, date_end, category_id } = req.body
        

        try {

            var experience = await models.experience.findOne({
                where: {
                    [Sequelize.Op.and]: [
                        { id: experience_id },
                        { user_id: user_id }
                    ]
                },
                include: [ 
                    { 
                        model: models.company,
                        attributes: ['name']
                    }, 
                    { 
                        model: models.occupation,
                        attributes: ['name']
                    }, 
                ],
            });

            if (!experience) throw(text.notFoundElement)

            const user = await existById(models.user, user_id);
            const occupation = await createOccupation(position || experience.occupation.name)
            const company = await createCompany(company_name || experience.company.name)

            await experience.update({
                user_id: user.id,
                occupation_id: occupation.id,
                date_end: date_end,
                date_start: date_start,
                description: description,
                category_id: category_id || experience.category_id,
                company_id: company.id,
                current_job: (date_end) ? 0 : 1
            });

            successful(res, text.successUpdate('experiencia'))

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