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
        var { order, employee_id, entrepreneur_id } = null
        if (type == "employee") {
            const employee = models.employee_id.findOne({ where: { user_id: user_id } })
            if (!employee) {
                return res.json({ status: false, message: "No se ha registrado como impulsor." })
            }
        } else if (type == "entrepreneur") {
            const entrepreneur = models.entrepreneur.findOne({ where: { user_id: user_id } })
            if (!entrepreneur) { return res.json({ status: false, message: "No se ha registrado como emprendedor." }) }
        }
        const usr_adv = await models.user_advice.findAll({
            where: {
                user_id: user_id,
            },
            include: [
                {
                    model: models.advice,
                    attributes: [[models.Sequelize.fn('MAX', models.Sequelize.col('order')), 'max']],
                    where: {
                        type: type
                    }
                }
            ],
            group: ["id"]
        })

        if (usr_adv.length == 0) {
            const adv = await models.advice.findOne({
                where: {
                    type: type,
                    order: order
                }
            })
            const new_usr_adv = await models.user_advice.create({
                advice_id: adv.id,
                user_id: user_id,
                startup_id: startup.id || null,
                employee_id: employee_id,
                entrepreneur_id: entrepreneur_id,
                date_viewed: Date.now(),
                viewed: true
            }).catch(err => {
                console.log(err)
            })
            return res.json({ status: true, message: "Consejo visto", data: adv })
        } else {
            return res.json(usr_adv)
        }

    }
}