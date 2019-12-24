const models = require('../models/index');

const { check, validationResult } = require('express-validator');

module.exports = {
    //Función encargada de validar los campos que se reciben desde el FrontEnd
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_string = "Este campo deber ser un string";
        var message_numeric = "Este campo debe ser numèrico";
        switch (method) {

            case 'create':

                return [
                    check('title').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('description').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('area_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                    check('startup_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                ]
            case 'update':

                return [
                    check('advertisement_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                ]

            case 'invitation':

                return [
                    check('advertisement_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                    check('saved').exists().withMessage(message_exists)
                ]
        }
    },

    showAdvice: async (req, res) => {
        const { user_id, type } = req.query
        var order = 0
        var whereConsult = {
            user_id: user_id
        }
        if (type == "employee") {
            const employee = await models.employee.findOne({ where: { user_id: user_id } }).catch(err => {
                console.log(err)
            })
            whereConsult = {
                user_id: user_id,
                employee_id: employee.id
            }
            if (!employee) { return res.json({ status: false, message: "No se ha registrado como impulsor." }) }
        } else if (type == "entrepreneur") {
            const entrepreneur = await models.entrepreneur.findOne({ where: { user_id: user_id } }).catch(err => {
                console.log(err)
            })
            whereConsult = {
                user_id: user_id,
                entrepreneur_id: entrepreneur.id,
            }
            if (!entrepreneur) { return res.json({ status: false, message: "No se ha registrado como emprendedor." }) }
        }
        // const usr_adv = await models.user_advice.findAll({
        //     where: whereConsult,
        //     attributes: ['id', 'advice_id', 'user_id', 'date_viewed']
        // })
        // var adv_ids = []
        // for (var i = 0; usr_adv.length > i; i++) {
        //     adv_ids = usr_adv[i].advice_id
        // }
        // console.log(adv_ids)
        // if (usr_adv.length == 0) {
        //     order = 0
        // } else {
        //     order = usr_adv[0].advice.dataValues.max
        // }
        // const adv = await models.advice.findAll({
        //     where: {
        //         id: { [models.Sequelize.Op.notIn]: adv_ids },
        //         type: type,
        //     },
        //     limit: 1
        // })
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
            order: [['date_viewed','DESC']],
            group: ['id','user_id','advice.type'],
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

    }
}