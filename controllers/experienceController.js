const models = require('../models/index');
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_numeric = "Este campo debe ser numérico";
        switch (method) {
            case 'createExperience':

                return [
                    check('employee_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('position', message_exists).exists(),
                    check('company', message_exists).exists(),
                    check('date_start', message_exists).exists(),
                ]
        }
    },
    createExperience: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var employee_id = req.body.employee_id;
        try {
            const employee = await models.employee.findByPk(employee_id);

            if (employee) {

                const experience = await models.experience.create({
                    employee_id: employee.id,
                    position: req.body.position,
                    company: req.body.company,
                    description: req.body.description,
                    date_start: req.body.date_start,
                    date_end: req.body.date_end,
                    current_job: req.body.current_job
                });

                return res.status(200).json({ message: "Experiencia del empleado creada correctamente", experience: experience });
            }
            else {
                return res.status(400).json({ message: "No existe el empleado" });
            }
        } catch (error) {

            console.log(error);
            res.status(500).send("Error al registrar la experiencia del empleado");
        }
    },

    updateExperience: async (req, res) => {
        const experience_id = req.params.experience_id;
        try {
             await models.experience.update({
                position: req.body.position,
                company: req.body.company,
                description: req.body.description,
                date_start: req.body.date_start,
                date_end: req.body.date_end,
                current_job: req.body.current_job
            }, { where: { id: experience_id } });

            return res.status(200).json({ message: "Experiencia actualizada creada correctamente" });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error al actualizar la experiencia del empleado");
        }
    },
}