const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('./elementController')
const { check, validationResult } = require('express-validator');

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
                    check('experience_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('position', message_exists).exists(),
                    check('company_name', message_exists).exists(),
                    check('date_start', message_exists).exists(),

                ]
        }
    },

    all: async (req, res) => {

        const { user_id } = req.params

        try {

            const user = await existById(models.user, user_id)
            var expereriences = await user.getExperience({
                attributes: [ 'id', 'position', [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%d/%m/%Y' ), 'date_start' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%d/%m/%Y' ), 'date_end' ], 'description', 'current_job'  ],
                include: [ 
                    {model: models.company}
                ]
            })

            return res.json({ status: true, message: "OK.", data: expereriences });

        } catch (error) {
            return res.json({ status: false, message: (error.message) ? error.message : error, data: {  } });
        }
    },

    createExperience: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }
        
        var user_id = req.body.user_id;

        try {

            const user = await models.user.findByPk(user_id);

            if (user) {

                var [ company, created ] = await  models.company.findOrCreate({
                    where: { name: { [Sequelize.Op.like]  : '%' + req.body.company_name + '%'} },
                    defaults: {
                        name: req.body.company_name
                    }
                })

                const experience = await models.experience.create({
                    user_id: user.id,
                    position: req.body.position,
                    company_id: company.id,
                    description: req.body.description,
                    date_start: req.body.date_start,
                    date_end: req.body.date_end,
                    current_job: req.body.current_job
                });

                return res.status(200).json({ status: true, message: "Experiencia del empleado creada correctamente", data: experience });
            }
            else {
                return res.status(200).json({ status: false, message: "No se encontró al empleado" });
            }
        } catch (error) {

            console.log(error);
            return res.status(200).json({ status: false, message: "Error al crear la experiencia del empleado" });
        }
    },

    updateExperience: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }

        const experience_id = req.body.experience_id;
        try {

            const experience = await models.experience.findByPk(experience_id);

            var [ company, created ] = await  models.company.findOrCreate({
                where: { name: { [Sequelize.Op.like]  : '%' + req.body.name_company + '%'} },
                defaults: {
                    name: req.body.name_company,
                }
            })

            await experience.update({
                position: req.body.position,
                company_id: company.id,
                description: req.body.description,
                date_start: req.body.date_start,
                date_end: req.body.date_end,
                current_job: req.body.current_job
            }, { where: { id: experience_id } });

            return res.status(200).json({ status: true, message: "Experiencia actualizada creada correctamente", data: experience });

        } catch (error) {
            console.log(error);
            return res.status(200).json({ status: false, message: "Error al actualizar la experiencia del empleado" });
        }
    },
}