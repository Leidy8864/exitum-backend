const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
const { existById } = require('./elementController')
const { createCompany } = require('./companyController')
const { check, validationResult } = require('express-validator');
const  { successful, returnError } = require('./responseController')

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_numeric = "Este campo debe ser numérico";
        switch (method) {
            case 'create':
                return [
                    check('user_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('position', message_exists).exists(),
                    check('date_start', message_exists).exists(),
                    check('company_name', message_exists).exists(),
                ]
            case 'update':
                return [
                    check('user_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('experience_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                ]
        }
    },

    all: async (req, res) => {

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
        if (!errors.isEmpty()) { returnError(res, "Lo sentimos, necesitamos algunos datos obligatorios.", errors.array()) }
        
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

            if (!created) {
                throw('Oops! Al parecer ya existe el registro.')
            }

            successful(res, 'Experiencia asignada satisfactoriamente.', experience)

        } catch (error) { returnError(res, error) }

    },

    updateExperience: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, "Lo sentimos, necesitamos algunos datos obligatorios.", errors.array()) }

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

            if (!experience) {
                throw(`Lo sentimos, nuestros registros no coiniciden con experience_id: ${experience_id} y user_id: ${user_id}`)
            }

            const company = await createCompany(company_name || experience.experience.name)

            await experience.update({
                position: position,
                company_id: company.id,
                description: description,
                date_start: date_start,
                date_end: date_end,
                current_job: current_job
            });

            successful(res, 'Experiencia actualizada satisfactoriamente.', experience)

        } catch (error) { returnError(res, error) }
        
    },

    delete: async (req, res) => {

        const { user_id, expererience_id } = req.body

        try {

            const experience = await models.experience.findOne({
                where: { 
                    [Sequelize.Op.and]: [
                        { id: expererience_id },
                        { user_id: user_id }
                    ]
                }
            })

            if (!experience) {
                throw(`Lo sentimos, nuestros registros no coiniciden con experience_id: ${experience_id} y user_id: ${user_id}`)
            }

            await experience.destroy()

            successful(res)
            
        } catch (error) { returnError(res, error) }

    }
}