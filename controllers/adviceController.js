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
        const { user_id, startup_id, type } = req.query
        var order = 0
        var employee_idd = undefined
        var entrepreneur_idd = undefined
        var whereConsult = {
            user_id: user_id
        }
        if (type == "employee") {
            const employee = await models.employee.findOne({ where: { user_id: user_id } })
            whereConsult = {
                user_id: user_id,
                employee_id: employee.id
            }
            employee_idd = employee.id
            if (!employee) { return res.json({ status: false, message: "No se ha registrado como impulsor." }) }
        } else if (type == "entrepreneur") {
            const entrepreneur = await models.entrepreneur.findOne({ where: { user_id: user_id } })
            whereConsult = {
                user_id: user_id,
                entrepreneur_id: entrepreneur.id,
            }
            entrepreneur_idd = entrepreneur.id
            if (!entrepreneur) { return res.json({ status: false, message: "No se ha registrado como emprendedor." }) }
        } else if (type == "startup") {
            whereConsult = {
                user_id: user_id,
                startup_id: startup_id
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
        await models.user_advice.create({
            advice_id: adv.id,
            user_id: user_id,
            startup_id: startup_id,
            employee_id: employee_idd,
            entrepreneur_id: entrepreneur_idd,
            date_viewed: Date.now(),
            viewed: true
        }).catch(err => {
            console.log(err)
        })
        return res.json({ status: true, message: "Consejo visto", data: adv })
    }
}