const text = require('../libs/text');
var moment = require('moment');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { arrayUnavailable } = require('./scheduleController')
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const { timesFormat, validateDateActual, validateTimeActual, validateRangeTime } = require('../controllers/hourController')

async function findAppointment(to_user_id, date, time) {

	var response = await models.appointment.findOne({
		where: {
			[ Sequelize.Op.and ]: [ { to_user_id: to_user_id }, { date: new Date(date) }, { time: time } ]
		}
	});

	// console.log(to_user_id, date, time, response);

	if (response) return true
	else return false

}

module.exports = {

	validate: (appointment) => {

		var to_user_id = check('to_user_id').exists().withMessage(text.id('usuario al que se agendará'))
		var from_user_id = check('from_user_id').exists().withMessage(text.id('usuario al que se agendará'))
		var appointment_id = check('appointment_id').exists().withMessage(text.id('recordatorio'))
		var date = check('date').exists().withMessage(text.date('agendar'))
		var time = check('time').exists().withMessage(text.time('agendar'))
		var type = check('type').exists().withMessage(text.type('agendar'))
			.isIn([ 'reunion', 'recordatorio' ]).withMessage(text.only('reunion', 'recordatorio'))
		var description = check('description').exists().withMessage(text.description)

		switch (appointment) {
			case 'by-user-reminder':
				return [ to_user_id ]
			case 'by-user-id':
				return [ to_user_id, date, type ];
			case 'create':
				return [ to_user_id, from_user_id, date, time, type, description ];
			case 'update':
				return [ to_user_id, from_user_id, appointment_id ];
			case 'cancel':
				return [ appointment_id ]
        }
        
	},

	listByUserId: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { to_user_id } = req.params;
		const { date, type } = req.body;

		try {
			
			const user = await existById(models.user, to_user_id);
			const appointment = await models.appointment.findAll({
				where: {
					[Sequelize.Op.and]: [ { to_user_id: user.id }, { date: new Date(date) }, { type: type } ]
				}
			});

			if (!appointment) throw text.notFoundElement;

			successful(res, 'OK', appointment);

		} catch (error) { returnError(res, error) }

	},

	listByUserReminder: async (req, res) => {

		var errors = validationResult(req)
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { to_user_id } = req.params
		// const perPage = 3
		// var page = req.query.page || 1;

		try {

			const user = await existById(models.user, to_user_id, 'id')
			var date = moment().subtract(24, 'hours');
			var minute = date.minutes();
			var local = date.subtract(minute, 'minutes').format('YYYY-MM-DD')

			const appointment = await models.appointment.findAll({
				attributes: [ 'id', 'title', 'from_user_id', 'to_user_id', 'date', [ Sequelize.fn( 'TIME_FORMAT', Sequelize.col('time'),  '%h:%i %p'), 'time' ],
					'type', 'type', 'description', 'status' ],
				where: {
					[Sequelize.Op.and] : [ 
						{ to_user_id: user.id }, { type: 'recordatorio' }, 
						{ date: { [ Sequelize.Op.gte ] : local } }  
					]
				},
				include: [
					{ 
						model: models.user, as: 'toAppointmentUser',
						attributes: [ 'id', [ Sequelize.fn('CONCAT', Sequelize.col('name'), ' ', Sequelize.col('lastname')), 'fullname' ] ]
					 }
				]
			})

			successful(res, 'OK', appointment)

		} catch (error) { returnError(res, error) }

	},

	listByUserMeeting: async (req, res) => {

		var errors = validationResult(req)
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { to_user_id } = req.params
		const perPage = 3
		var page = req.query.page || 1;

		try {

			const user = await existById(models.user, to_user_id, 'id')
			var date = moment().subtract(24, 'hours');
			var minute = date.minutes();
			var local = date.subtract(minute, 'minutes').format('YYYY-MM-DD')

			const appointment = await models.appointment.findAll({
				attributes: [ 'id', 'title', 'from_user_id', 'to_user_id', 'date', [ Sequelize.fn( 'TIME_FORMAT', Sequelize.col('time'),  '%h:%i %p'), 'time' ],
					'type', 'type', 'description', 'status' ],
				where: {
					[ Sequelize.Op.and ] : [ 
						{ type: 'reunion' }, 
						{ date: { [ Sequelize.Op.gte ] : local  } }
					],
					[ Sequelize.Op.or ] : [
						{ to_user_id: user.id },
						{ from_user_id: user.id }
					]
				},
				include: [
					{ 
						model: models.user, as: 'toAppointmentUser',
						attributes: [ 'id', [ Sequelize.fn('CONCAT', Sequelize.col('toAppointmentUser.name'), ' ', Sequelize.col('toAppointmentUser.lastname')), 'fullname' ] ]
					},
					{
						model: models.user, as: 'fromAppointmentUser',
						attributes: [ 'id', [ Sequelize.fn('CONCAT', Sequelize.col('fromAppointmentUser.name'), ' ', Sequelize.col('fromAppointmentUser.lastname')), 'fullname' ] ]
					}
				]
			})

			successful(res, 'OK', appointment)

		} catch (error) { returnError(res, error) }

	},

	create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { to_user_id } = req.params;
		const { from_user_id, title, date, time, type, description } = req.body;

		try {

			const user = await existById(models.user, to_user_id, 'id', 'from_hour', 'to_hour')
			var timeF = timesFormat(time)

			validateRangeTime(user.from_hour, user.to_hour, timeF[3])
			var unavailable =  arrayUnavailable(await user.getUnavailables({ attributes: ['time'] }))

			if(!unavailable.indexOf(timeF[3])) throw(text.notAvailable('hora'))
			// if(validateDateActual(date)) validateTimeActual(time)

			var [ response, created ] = await models.appointment.findOrCreate({
				where: {
					[ Sequelize.Op.and ]: [ { to_user_id: to_user_id }, { date: new Date(date) }, { time: timeF[3] } ]
				},
				defaults: {
					title: title,
					to_user_id: to_user_id, 
					from_user_id: from_user_id,
					date: date,
					time: timeF[3],
					type: type,
					description: description,
					status: false
				}
			});

            if (!created) throw (text.duplicateElement);

            successful(res, text.successCreate('reserva'));
            
        } catch (error) { returnError(res, error); }
        
	},
	
	update: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { appointment_id } = req.params;
		const { to_user_id, from_user_id, title, date, time, description } = req.body;

		try {

			const user = await existById(models.user, to_user_id, 'id', 'from_hour', 'to_hour');

			var appointment = await models.appointment.findOne({
				where: {
					[Sequelize.Op.and] : [
						{ id: appointment_id },
						{ to_user_id: to_user_id },
						{ from_user_id: from_user_id }
					]
				}
			})

			if (!appointment) throw (text.notFoundElement);

			var timeF = time ? timesFormat(time) : [ appointment.time ];
			const timeS = timeF[3] || timeF[0]
			const dateS = date || appointment.date

			validateRangeTime(user.from_hour, user.to_hour, timeS)
			var unavailable =  arrayUnavailable(await user.getUnavailables({ attributes: ['time'] }))

			if(!unavailable.indexOf(timeS)) throw(text.notAvailable('hora'))

			if (appointment.date != dateS && appointment.time != timeS) {

				if(validateDateActual(date)) validateTimeActual(time)
				if(await findAppointment(to_user_id, dateS, timeS)) throw(text.duplicateElement)

			} else  {

				if (appointment.date != dateS) {
					validateDateActual(dateS)
					if(await findAppointment(to_user_id, dateS, timeS)) throw(text.duplicateElement)
				}

				if (appointment.time != timeS) {
					validateTimeActual(time)
					if(await findAppointment(to_user_id, dateS, timeS)) throw(text.duplicateElement)
				}

			}

			await appointment.update({
				title: title || appointment.title,
				date: dateS,
				time: timeS,
				description: description || appointment.description
			})

            successful(res, text.successUpdate('reserva'));
            
        } catch (error) { returnError(res, error); }
        
	},

	cancel: async (req, res) => {

		var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { appointment_id } = req.params

		try {

			var appointment = await models.appointment.findOne({ where: { id: appointment_id } })

			if (!appointment) throw (text.notFoundElement)

			appointment.destroy()

			successful(res, text.successDelete('agenda'))

		} catch (error) { returnError(res, error) }

	}, 

	rate: async (req, res) => {

		var errors = validationResult(req);
		if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }
		
		try {

		} catch (error) { returnError(res, error) }

	},

	confirmation: async (req, res) => {

		var errors = validationResult(req);
		if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { appointment_id } = req.params
		const { status } = req.body

		try {
			
			var appointment = await existById(models.appointment, appointment_id)
			
			if (status)
				await appointment.update({ status: true })
			else
				await appointment.destroy()

			successful(res)

		} catch (error) { returnError(res, error) }

	}

};
