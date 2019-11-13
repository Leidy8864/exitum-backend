const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { arrayUnavailable } = require('./scheduleController')
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const { timesFormat, validateDateActual, validateTimeActual } = require('../controllers/hourController');

module.exports = {

	validate: (appointment) => {

		var user_id = check('to_user_id').exists().withMessage(text.id('usuario al que se agendará'))
		var hour_id = check('from_user_id').exists().withMessage(text.id('usuario que inició sesión'))
		var date = check('date').exists().withMessage(text.date('agendar'))
		var time = check('time').exists().withMessage(text.time('agendar'))
		var type = check('type').exists().withMessage(text.type('agendar'))
			.isIn([ 'reunion', 'recordatorio' ]).withMessage(text.only('reunion', 'recordatorio'))
		var description = check('description').exists().withMessage(text.description)

		switch (appointment) {
			case 'by-user-id':
				return [ user_id, date ];
			case 'create':
				return [ user_id, hour_id, date, time, type, description ];
        }
        
	},

	listByUserId: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { user_id } = req.params;
		const { date } = req.body;

		try {
			
			const user = await existById(models.user, user_id);
			const appointment = await models.appointment.findOne({
				where: {
					[Sequelize.Op.and]: [ { to_user_id: user.id }, { date: new Date(date) } ]
				}
			});

			if (!appointment) throw text.notFoundElement;

			successful(res, 'OK', appointment);

		} catch (error) { returnError(res, error) }

	},

	create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

		const { to_user_id } = req.params;
		const { from_user_id, date, time, type, description } = req.body;

		try {

			console.log(req.body, req.params)

			const user = await existById(models.user, to_user_id, 'id');
			var timeF = timesFormat(time);

			var unavailable =  arrayUnavailable(await user.getUnavailables({ attributes: ['time'] }))

			if(!unavailable.indexOf(timeF)) throw(text.notAvailable('hora'))
			// if(!validateDateActual(date)) validateTimeActual(time)

			var from_user = type == 'recordatorio' ? user.id : from_user_id;

			var [ response, created ] = await models.appointment.findOrCreate({
				where: {
					[Sequelize.Op.and]: [ { to_user_id: user.id }, { date: new Date(date) }, { time: timeF[3] } ]
				},
				defaults: {
					to_user_id: user.id, 
					from_user_id: from_user,
					date: date,
					time: timeF[3],
					type: type,
					description: description
				}
			});

			console.log(created)

            if (!created) throw (text.duplicateElement);

            successful(res, text.successCreate('reserva'));
            
        } catch (error) { returnError(res, error); }
        
	},

	cancel: (req, res) => {}
};
