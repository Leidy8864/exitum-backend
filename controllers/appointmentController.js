const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const { timesFormat, validateDateActual, validateTimeActual } = require('../controllers/hourController');
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (appointment) => {

        var user_id = check('to_user_id')
            .exists().withMessage('Es necesario el ID del usuario con el cual se agendará.')
        var hour_id = check('from_user_id')
            .exists().withMessage('Es necesario el ID del usuario logueado.')
        var date = check('date')
            .exists().withMessage('Es necesario una fecha.')
        var time = check('time')
            .exists().withMessage('Es necesario una hora.')
        var type = check('type')
            .exists().withMessage('Es necesario el tipo de agenda.')
            .isIn([ 'reunion', 'recordatorio' ]).withMessage("Solamente se aceptan :reunion o :recordatorio como parámetros.")
        var description = check('description')
            .exists().withMessage("Es necesario una hora de fin.")
            
        switch (appointment) {
            case 'create':
                return [ user_id, hour_id, date, time, type, description ]
        }
    },

    create:  async(req, res) => {

        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            returnError( res, 'Campos incorrectos, por favor intentelo nuevamente.', errors.array() )
        }

        const { to_user_id } = req.params
        const { from_user_id, date, time, type, description } = req.body
        
        try {

            const user = await existById(models.user, to_user_id, 'id')
            var timeF = timesFormat(time);

            validateDateActual(date)
            validateTimeActual(time)

            var from_user = (type == 'recordatorio') ? user.id : from_user_id

            var [ response, created ] = await  models.appointment.findOrCreate({
                where: {
                    [ Sequelize.Op.and ] : [
                        { to_user_id: user.id },
                        { date: new Date(date) },
                        { time: timeF[3] }
                    ]
                },
                defaults: {
                    to_user_id: user.id, from_user_id: from_user, date: date,
                    time: timeF[3], type: type, description: description
                }
            })

            if (!created) throw (`Lo sentimos, su ${response.type} ya no está disponible.`)

            successful( res, `Su ${response.type}, fue registrada satisfactoriamente.` )
            
        } catch (error) { returnError( res, error ) }

    }


}