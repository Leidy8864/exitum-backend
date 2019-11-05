const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById, arr_diff } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const { timesFormat, convertTimes } = require('../controllers/hourController');
const { check, validationResult } = require('express-validator');

function availableHours(startTime, endTime, not_available) {
    var hours = [ ]

    for (let hour = startTime; hour < endTime; hour++) {
        hours.push( convertTimes(`${hour}:00`) )
    }

    var unavailable = not_available.map(element => {
        return  convertTimes(element.time)
    })

    var available = arr_diff(hours, unavailable)

    return available
}

module.exports = {

    validate: (schedule) => {

        var user_id = check('user_id')
            .exists().withMessage('Es necesario el ID del usuario')
        var from_hour = check('from_hour')
            .exists().withMessage('Es necesario una hora de inicio.')
        var to_hour = check('to_hour')
            .exists().withMessage("Es necesario una hora de fin.")
        var not_available = check('not_available')
            .exists().withMessage("Es necesario la hora en la que no estará disponible.")
        var date = check('date')
            .exists().withMessage("Es necesario la fecha en que se agendará.")

        switch (schedule) {
            case 'create':
                return [ user_id, from_hour, to_hour ]
            case 'unavailable':
                return [ user_id, not_available ]
            case 'schedule':
                return [ user_id ]
            case 'scheduleDate':
                return [ user_id, date ]
        }
            
    },

    create: async (req, res) => {

        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            returnError( res, 'Campos incorrectos, por favor intentelo nuevamente.', errors.array() )
        }

        const { from_hour, to_hour } = req.body
        const { user_id } = req.params

        try {

            var f_hour = timesFormat(from_hour)
            var t_hour = timesFormat(to_hour)

            var user = await existById(models.user, user_id, 'id')
            user.update({
                from_hour: f_hour[3],
                to_hour: t_hour[3]
            })

            successful(res)

        } catch (error) { returnError(res, error) }
    },

    unavailable: async (req, res) => {

        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            returnError( res, 'Campos incorrectos, por favor intentelo nuevamente.', errors.array() )
        }

        const { user_id } = req.params
        const { not_available } = req.body

        var hour = timesFormat(not_available)

        try {

            var user = await existById(models.user, user_id, 'id', 'from_hour', 'to_hour')

            var [ response, created ] = await  models.unavailable.findOrCreate({
                where: {
                    [ Sequelize.Op.and ] : [
                        { user_id: user.id },
                        { time: hour[3] }
                    ]
                },
                defaults: {
                    user_id: user.id,
                    time: hour[3]
                }
            })

            successful(res)

        } catch ( error ) { returnError(res, error) }

    },

    schedule: async (req, res) => {

        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            returnError( res, 'Campos incorrectos, por favor intentelo nuevamente.', errors.array() )
        }

        const { user_id } = req.params

        try {

            const user = await existById(models.user, user_id, 'id', 'from_hour', 'to_hour')
            const startTime = Number(user.from_hour.match(/^(\d+)/)[1])
            const endTime = Number(user.to_hour.match(/^(\d+)/)[1])

            var not_available = await user.getUnavailables({ attributes: [ 'time' ] });
            var available = availableHours(startTime, endTime, not_available)

            successful(res, 'OK', available)

        } catch (error) { returnError(res, error) }
        
    }, 
    
    scheduleDate: async (req, res) => {

        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            returnError( res, 'Campos incorrectos, por favor intentelo nuevamente.', errors.array() )
        }

        const { user_id } = req.params
        const { date } = req.body

        try {

            const user = await existById(models.user, user_id)
            const startTime = Number(user.from_hour.match(/^(\d+)/)[1])
            const endTime = Number(user.to_hour.match(/^(\d+)/)[1])
            
            var not_available = await user.getUnavailables({ attributes: [ 'time' ] });
            var available = availableHours(startTime, endTime, not_available)

            var appointment = await models.appointment.findAll({
                attributes: [ 'time' ],
                where: {
                    [Sequelize.Op.and]: [
                        { date: new Date(date) },
                        { to_user_id: user.id }
                    ]   
                }
            })

            var appointment_act = appointment.map(element => {
                return convertTimes(element.time)
            })

            var hours_available = arr_diff(available, appointment_act)

            successful(res, 'OK', hours_available)

        } catch (error) { returnError(res, error) }
        
    }

}