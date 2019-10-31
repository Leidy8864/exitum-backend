const models = require('../models/index');
const Sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');

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
                    check('university_name').exists().withMessage(message_exists),
                    check('user_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('education_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('date_start').exists().withMessage(message_exists),
                    check('date_end').exists().withMessage(message_exists)
                ]
        }
    },
    createEducation: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }
        var user_id = req.body.user_id
        try {
            const user = await models.user.findByPk(user_id);
            if (user) {

                var [ university, created ] = await  models.university.findOrCreate({
                    where: { university: { [Sequelize.Op.like]  : '%' + req.body.university_name + '%'} },
                    defaults: {
                        university: req.body.university_name
                    }
                })

                const education = await models.education.create({
                    user_id: user.id,
                    description: req.body.description,
                    date_start: req.body.date_start,
                    date_end: req.body.date_end,
                    university_id: university.id
                });

                return res.status(200).json({ status: true, message: "Educación del empleado creada correctamente", data: education });
            }
            else {
                return res.status(200).json({ status: false, message: "No existe el empleado" });
            }

        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "Error al registrar la educación del empleado" });
        }
    },

    updateEducation: async (req, res) => {
        const education_id = req.body.education_id;
        try {
            const education = await models.education.findByPk(education_id);

            var [ university, created ] = await  models.university.findOrCreate({
                where: { university: { [Sequelize.Op.like]  : '%' + req.body.university_name + '%'} },
                defaults: {
                    university: req.body.university_name
                }
            })

            await education.update({
                description: req.body.description,
                date_start: req.body.date_start,
                date_end: req.body.date_end,
                university_id: university.id
            }, { where: { id: education_id } });

            return res.status(200).json({ status: true, message: "Educación actualizada actualizada correctamente", data: education });

        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "Error al actualizar la educación del empleado" });
        }
    },
}