const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById, arr_diff } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const { timesFormat, convertTimes } = require('../controllers/hourController');

function availableHours(start_Time, end_Time, not_available) {

    var hours = [ ]
    const startTime = Number(String(start_Time).match(/^(\d+)/)[1])
    const endTime = Number(String(end_Time).match(/^(\d+)/)[1])

    for (let hour = startTime; hour < endTime; hour++) {
        hours.push( convertTimes(`${hour}:00`) )
    }

    var unavailable = not_available.map(element => {
        return  (element.time) ? convertTimes(element.time) :  element
    })

    var available = arr_diff(hours, unavailable)

    return available
}

function arrayUnavailable(data) {

    var unavailable = data.map(elemet => {
        return elemet.time
    })

    return unavailable

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
        var available = check('available')
            .exists().withMessage("Es necesario las horas disponibles del usuario.")
        var date = check('date')
            .exists().withMessage("Es necesario la fecha en que se agendará.")

        switch (schedule) {
            case 'create':
                return [ user_id, from_hour, to_hour ]
            case 'unavailable':
                return [ user_id, not_available ]
            case 'available':
                return [ user_id, available ]
            case 'schedule':
                return [ user_id ]
            case 'scheduleDate':
                return [ user_id, date ]
        }
            
    },

    create: async (req, res) => {

        var errors = validationResult(req)

        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

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

            successful(res, text.successCreate('horario'))

        } catch (error) { returnError(res, error) }
    },

    unavailable: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

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

            successful(res, text.successCreate('horario no disponible'))

        } catch ( error ) { returnError(res, error) }

    },
    
    unavailable_multiple: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params
        const { available } = req.body

        try {

            var user = await existById(models.user, user_id, 'id', 'from_hour', 'to_hour')
            var not_available = availableHours(user.from_hour, user.to_hour, available)
            var get_unavailables = await user.getUnavailables({ attributes: ['time'] })

            if (get_unavailables) await models.unavailable.destroy({ where: { user_id: user.id } })

            not_available.map(async element => {

                var hour = timesFormat(element)

                await  models.unavailable.create({
                        user_id: user.id,
                        time: hour[3]
                })

            })

            successful(res, text.successCreate('horas disponibles'))

        } catch ( error ) { returnError(res, error, error) }

    },

    schedule: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params

        try {

            const user = await existById(models.user, user_id, 'id', 'from_hour', 'to_hour')

            var not_available = await user.getUnavailables({ attributes: [ 'time' ] });
            var available = availableHours(user.from_hour, user.to_hour, not_available)

            successful(res, 'OK', available)

        } catch (error) { returnError(res, error) }
        
    }, 
    
    scheduleDate: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params
        const { date } = req.body

        try {

            const user = await existById(models.user, user_id)
            
            var not_available = await user.getUnavailables({ attributes: [ 'time' ] });
            var available = availableHours(user.from_hour, user.to_hour, not_available)

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
        
    },

    arrayUnavailable: arrayUnavailable

}