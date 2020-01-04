const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('./responseController')
const text = require('../libs/text')

module.exports = {
    //Función encargada de validar los campos que se reciben desde el FrontEnd
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_string = "Este campo deber ser un string";
        var message_numeric = "Este campo debe ser numèrico";
        switch (method) {

            case 'create':
                return [
                    check('description').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('type').exists().withMessage(message_exists).isString().withMessage(message_string),
                ]

            case 'update':
                return [
                    check('advice_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                ]

            case 'delete':
                return [
                    check('advice_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric)
                ]
        }
    },

    showAdvice: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id, type } = req.query
        var order = 0
        var whereConsult = {
            user_id: user_id
        }
        if (type == "employee") {
            const employee = await models.employee.findOne({ where: { user_id: user_id } }).catch(err => {
                console.log(err)
            })
            if (employee) {
                whereConsult = {
                    user_id: user_id,
                    employee_id: employee.id
                }
            } else {
                return res.json({ status: false, message: "No se ha registrado como impulsor." })
            }

        } else if (type == "entrepreneur") {
            const entrepreneur = await models.entrepreneur.findOne({ where: { user_id: user_id } }).catch(err => {
                console.log(err)
            })
            if (entrepreneur) {
                whereConsult = {
                    user_id: user_id,
                    entrepreneur_id: entrepreneur.id,
                }
            } else {
                return res.json({ status: false, message: "No se ha registrado como emprendedor." })
            }
        }
        const usr_adv = await models.user_advice.findAll({
            where: whereConsult,
            attributes: ['id', 'user_id', 'date_viewed'],
            include: [
                {
                    model: models.advice,
                    attributes: ['type', [models.Sequelize.fn('MAX', models.Sequelize.col('order')), 'max']],
                    where: {
                        type: type
                    }
                }
            ],
            order: [['date_viewed', 'DESC']],
            group: ['id', 'user_id', 'advice.type'],
        })
        if (usr_adv.length == 0) {
            order = 0
            console.log(order)
        } else {
            order = usr_adv[0].advice.dataValues.max
            console.log(order)
        }

        const adv = await models.advice.findOne({
            where: {
                active: 1,
                type: type,
                order: order + 1
            }
        })

        if (!adv) {
            return res.json({ status: false, message: "Se mostraron todos los consejos registrados" })
        } else {
            return res.json({ status: true, message: "Mostrando consejo", data: adv })
        }
    },

    checkAdvice: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { advice_id, user_id, type } = req.body
        var employee_id = undefined
        var entrepreneur_id = undefined
        if (type == "employee") {
            const employee = await models.employee.findOne({ where: { user_id: user_id } })
            employee_id = employee.id
            if (!employee) { return res.json({ status: false, message: "No se ha registrado como impulsor." }) }
        } else if (type == "entrepreneur") {
            const entrepreneur = await models.entrepreneur.findOne({ where: { user_id: user_id } })
            entrepreneur_id = entrepreneur.id
            if (!entrepreneur) { return res.json({ status: false, message: "No se ha registrado como emprendedor." }) }
        }
        const usr_adv = await models.user_advice.create({
            advice_id: advice_id,
            user_id: user_id,
            employee_id: employee_id,
            entrepreneur_id: entrepreneur_id,
            date_viewed: Date.now(),
            viewed: true
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Lo sentimos, vuelva a intentarlo." })
        })
        return res.json({ status: true, message: "Consejo marcado como visto.", data: usr_adv })

    },

    createAdvice: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { title, description, type } = req.body
        const adviceMax = await models.advice.findAll({
            where: { type: type, active: 1 },
            attributes: [[models.Sequelize.fn('max', models.Sequelize.col('order')), 'max']]
        })

        await models.advice.create({
            title: title,
            description: description,
            type: type,
            order: adviceMax[0].dataValues.max + 1
        }).then(advice => {
            res.json({ status: true, message: "Creado correctamente", data: advice })
        }).catch(err => {
            console.log(err)
            res.json({ status: false, message: "Error al crear el consejo" })
        })
    },

    updateAdvice: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { advice_id, title, description } = req.body

        await models.advice.update({
            title: title,
            description: description,
        }, { where: { id: advice_id } }).then(advice => {
            res.json({ status: true, message: "Actualizado correctamente", data: advice })
        }).catch(err => {
            console.log(err)
            res.json({ status: false, message: "Error al actualizar el consejo" })
        })
    },

    deleteAdvice: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { advice_id } = req.body

        await models.advice.update({
            active: 0
        }, { where: { id: advice_id } }).then(advice => {
            res.json({ status: true, message: "Eliminado correctamente", data: advice })
        }).catch(err => {
            console.log(err)
            res.json({ status: false, message: "Error al eliminar el consejo" })
        });
    },

    list: async (req, res) => {
        await models.advice.findAll({
            where: {
                active: 1
            },
            order: ['type']
        }).then(advices => {
            return res.json({ status: true, message: "Lista de consejos.", data: advices })
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Lo sentimos, vuelve a intentarlo." })
        })
    }
}