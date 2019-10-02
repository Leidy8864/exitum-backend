const models = require('../models/index');
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_numeric = "Este campo debe ser numérico";
        switch (method) {
            case 'education':
                return [
                    check('employee_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('date_start').exists().withMessage(message_exists),
                    check('date_end').exists().withMessage(message_exists)
                ]
        }
    },
    createEducation: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var employee_id = req.body.employee_id
        try {
            const employee = await models.employee.findByPk(employee_id);
            if (employee) {

                const education = await models.education.create({
                    employee_id: employee.id,
                    description: req.body.description,
                    date_start: req.body.date_start,
                    date_end: req.body.date_end,
                    university_id: req.body.university_id,
                    other_university: req.body.other_university
                });

                return res.status(200).json({ message: "Educación del empleado creada correctamente", education: education });
            }
            else {
                return res.status(400).json({ message: "No existe el empleado" });
            }

        } catch (error) {
            console.log(error);
            res.status(500).send("Error al registrar la educacion del empleado");
        }
    },

    updateEducation: async (req, res) => {
        const education_id = req.params.education_id;
        try {
             await models.education.update({
                position: req.body.position,
                description: req.body.description,
                date_start: req.body.date_start,
                date_end: req.body.date_end,
                university_id: req.body.university_id,
                other_university: req.body.other_university
            }, { where: { id: education_id } });

            return res.status(200).json({ message: "Educación actualizada actualizada correctamente" });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error al actualizar la educación del empleado");
        }
    },
}