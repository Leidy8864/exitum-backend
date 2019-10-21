const models = require('../models/index');
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_numeric = "Este campo debe ser numérico";
        switch (method) {
            case 'create':
                return [
                    check('id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('advertisement_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                ]
            case 'update':
                return [
                    check('employee_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('education_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('date_start').exists().withMessage(message_exists),
                    check('date_end').exists().withMessage(message_exists)
                ]
        }
    },

    create: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }
        const { advertisement_id, id } = req.body
        try {
            await models.employee.findOne({ where: { user_id: id } }).then(employee => {
                if (employee) {
                    employee.addProposal(advertisement_id, { through: { accepted: false, created_at: Date.now() } }).then(prop => {
                        if (prop) {
                            return res.json({ status: true, message: "Propuesta creada o actualizada correctamente.", data: prop });
                        } else {
                            return res.json({ status: false, message: "No se efectuaron cambios en la base de datos." });
                        }
                    })
                } else {
                    return res.json({ status: false, message: "No existe impulsor para este usuario." })
                }
            })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "Error al registrar la propuesta del impulsor." });
        }
    },

    list: async (req, res) => {
        const { advertisement_id } = req.params
        try {
            models.proposal.findAll({
                where: { advertisement_id: advertisement_id },
                include: [
                    {
                        model: models.employee,
                        include: [
                            { 
                                model: models.user,
                                attributes: ['id', 'name', 'lastname']
                            }
                        ]
                    }
                ]
            }).then(proposal => {
                if (proposal) {
                    res.json({ status: true, message: "Listado de propuestas de impulsores", data: proposal })
                } else {
                    console.log('no')
                }
            });
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "Error al listar propuestas propuesta del impulsor." });
        }
    }
}