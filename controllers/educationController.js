const Sequelize = require('sequelize');
const models = require('../models/index');
const { existById } = require('./elementController')
const { createUniversity } = require('./universityController')
const { check, validationResult } = require('express-validator');
const  { successful, returnError } = require('./responseController')

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_numeric = "Este campo debe ser numérico";
        switch (method) {
            case 'create':
                return [
                    check('university_name').exists().withMessage(message_exists),
                    check('user_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('description').exists().withMessage(message_exists),
                    check('date_start').exists().withMessage(message_exists),
                    check('date_end').exists().withMessage(message_exists)
                ]
            case 'update':
                return [
                    check('education_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('user_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric)
                ]
        }
    },

    all: async (req, res) => {

        const { user_id } = req.params

        try {

            const user = await existById(models.user, user_id)

            var education = await user.getEducation({
                attributes: [ 'id', 'description', [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%Y-%m-%d' ), 'date_start' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%Y-%m-%d' ), 'date_end' ] ],
                include: [ { model: models.university } ]
            })

            return res.json({ status: true, message: "OK.", data: education });

        } catch (error) { return res.json({ status: false, message: (error.message) ? error.message : error, data: {  } }); }
        
    },

    createEducation: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, "Lo sentimos, necesitamos algunos datos obligatorios.", errors.array()) }

        const { user_id, university_name, description, date_start, date_end } = req.body
        try {
            
            const user = await existById(models.user, user_id);

            const university = await createUniversity(university_name)

            const education = await models.education.create({
                user_id: user.id,
                description: description,
                date_start: date_start,
                date_end: date_end,
                university_id: university.id
            });

            successful(res, 'Educación asignada correctamente.', education)

        } catch (error) { returnError(res, error) }
        
    },

    updateEducation: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, "Lo sentimos, necesitamos algunos datos obligatorios.", errors.array()) }

        const { education_id, user_id, university_name, description, date_start, date_end } = req.body
        
        try {

            var education = await models.education.findOne({
                where: {
                    [Sequelize.Op.and]: [
                        { id: education_id},
                        { user_id: user_id}
                    ]
                },
                include: [ { 
                    model: models.university,
                    attributes: ['university']
                } ],
            });

            if (!education) {
                throw(`Lo sentimos, nuestros registros no coiniciden con experience_id: ${experience_id} y user_id: ${user_id}`)
            }

            const university = await createUniversity(university_name || education.university.university)

            await education.update({
                description: description,
                date_start: date_start,
                date_end: date_end,
                university_id: university.id
            });

            successful(res, 'Educación actualizada satisfactoriamente.', education)

        } catch (error) { returnError(res, error) }
    },

    delete: async (req, res) => {

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

            if (!education) {
                throw(`Lo sentimos, nuestros registros no coiniciden con education_id: ${education_id} y user_id: ${user_id}`)
            }

            await education.destroy()

            successful(res)
            
        } catch (error) { returnError(res, error) }

    }

}