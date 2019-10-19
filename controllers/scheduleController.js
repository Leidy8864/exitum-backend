const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('../controllers/elementController');
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (review) => {

        var user_id = check('user_id')
            .exists().withMessage('Es necesario el ID del usuario')

        var from_hour = check('from_hour')
            .exists().withMessage('Es necesario una hora de inicio.')

        var to_hour = check('to_hour')
            .exists().withMessage("Es necesario una hora de fin.")

            return [ user_id, from_hour, to_hour ]
    },

    create:  async(req, res) => {

        const { user_id, from_hour, to_hour, unavailable } = req.body

        try {

            const user = await existById(models.user, user_id, 'id')
            const available = await models.available.create({ 
                user_id: user.id,
                from_hour: from_hour,
                to_hour: to_hour
            })

            unavailable.map( element => {
                models.unavailable.create({ available_id: available.id, hour_break: element })
            })

            return res.status(200).json({ status: true, message: 'OK', data: {  } })

        } catch (err) {
            return res.status(500).json({ status: false, message: err.message, data: {} })
        }
    },

}