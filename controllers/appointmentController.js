const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('../controllers/elementController');
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (review) => {

        var user_id = check('user_id')
            .exists().withMessage('Es necesario el ID del usuario')

        var hour_id = check('hour_id')
            .exists().withMessage('Es necesario una hora de inicio su ID.')
        var date = check('date')
            .exists().withMessage('Es necesario una fecha.')
        var type = check('type')
            .exists().withMessage('Es necesario el tipo de agenda.')
        var description = check('description')
            .exists().withMessage("Es necesario una hora de fin.")

            return [ user_id, hour_id, date, type, description ]
    },

    create:  async(req, res) => {

        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }

        const { user_id, hour_id, date, type, description } = req.body
        
        try {

            const user = await existById(models.user, user_id, 'id')
            user.addToUserHourAppointment( hour_id, { through: { date: date, type: type, description: description } } )
            return res.status(200).json({ status: true, message: "Guardado correctamente", data: {  } })

        } catch (err) {

            return res.status(200).json({ status: false, message: err.message, data: {  } })

        }

    }


}