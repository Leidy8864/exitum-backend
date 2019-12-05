const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
const { sendEmail } = require('../libs/mail')
const { existById } = require('./elementController')
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('./responseController')
const { createCategory } = require('./categoryController')

module.exports = {

    validate: (method) => {

        const day = check('day').exists().withMessage(text.day('evento'))
        const title = check('title').exists().withMessage(text.title('evento'))
        const place = check('place').exists().withMessage(text.place('evento'))
        const user_id = check('user_id').exists().withMessage(text.id('evento del usuario'))
        const user = check('user_id').exists().withMessage(text.id('evento del usuario'))
        const event_id = check('event_id').exists().withMessage(text.id('evento'))
        const hour_end = check('hour_end').exists().withMessage(text.dateEnd)
        const hour_start=  check('hour_start').exists().withMessage(text.dateStart)
        const description = check('description').exists().withMessage(text.description)
        const categories = check('categories').exists().withMessage(text.category('evento'))
        const participants = check('participants').exists().withMessage(text.participants)

        switch (method) {
            case 'create':
                return [ title, day, place, user_id, hour_start, description, categories, participants ]
            case 'list-by-user':
                return [ user_id ]
            case 'list-by-user-id':
                return [ user ]
            case 'take-part':
                return [ event_id, user_id ]
            case 'update':
                return [ event_id, user_id ]
            case 'delete':
                return [ event_id ]
        }

    },

    listAll: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        let perPage = 20;
        let page = req.query.page || 1;
        const { user } = req.query

        try {

            var events_number = await models.workshop.count({ where: { user_id: { [ Sequelize.Op.ne ]:  user } } })
            
            var events = await models.workshop.findAll({
                where: { 
                    user_id: { [ Sequelize.Op.ne ]:  user } ,
                },
                include: [
                    {
                        model: models.user,
                        as: 'toWorkshopUsers',
                        attributes:[ 'id', [ Sequelize.fn('CONCAT', Sequelize.col('toWorkshopUsers.name'), ' ', Sequelize.col('lastname')), 'fullname' ], 'photo' ],
                        through: { where: { user_id: { [ Sequelize.Op.eq ] : user } } } ,
                        // where: { id : user }
                    },
                    {
                        model: models.category,
                        as: 'toWorkshopCategories'
                    }
                ],
                attributes: [
                    'id', 'title', 'day',  [ Sequelize.fn( 'TIME_FORMAT', Sequelize.col('hour_start'),  '%h:%i %p'), 'hour_start' ],
                    [ Sequelize.fn( 'TIME_FORMAT', Sequelize.col('hour_end'),  '%h:%i %p'), 'hour_end' ], 'place', 'description', 'user_id'
                    // [ Sequelize.fn( 'COUNT', Sequelize.col('toWorkshopUsers.id') ), 'join' ]
                ],
                // group : [ 'id', 'toWorkshopUsers.id', 'toWorkshopCategories.id'],
                limit: perPage,
                offset: (perPage * (page - 1))
            })
            
            var event = events.reduce( (element, option) => {
                if (!option.toWorkshopUsers.length) {
                    element.push(option)
                }
                return element
            }, [])

            return res.status(200).json({ status: true, message: 'OK', data: event })

        } catch (error) { returnError(res, error, error) }

    },

    show: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { event_id } = req.params

        try {
            
            var event = await models.workshop.findByPk(event_id, {
                include: [
                    {
                        model: models.user,
                        as: 'toWorkshopUsers',
                        attributes:[ 'id', [ Sequelize.fn('CONCAT', Sequelize.col('toWorkshopUsers.name'), ' ', Sequelize.col('lastname')), 'fullname' ], 'photo' ],
                    },
                    {
                        model: models.category,
                        as: 'toWorkshopCategories'
                    }
                ],
                attributes: [
                    'id', 'title', 'day', 'hour_start', 'hour_end', 'place', 'description', 'user_id'
                ],
            })
            successful(res, 'OK', event)
            
        } catch (error) { returnError(res, error) }

    },

    participatingEvents: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }
        
        const { event_id } = req.params
        const perPage = 12;
        let page = req.query.page || 1;

        try {
            
            var events_number = await models.user_workshop.count({ where: { workshop_id: event_id } })
            const event = await existById(models.workshop, event_id)
            var event_user = await event.getToWorkshopUsers({
                offset: (perPage * (page - 1)),
                limit: perPage,
                attributes: [ 'id', [ Sequelize.fn('CONCAT', Sequelize.col('name'), ' ', Sequelize.col('lastname')), 'fullname' ], 'photo' ]
            })

            return res.status(200).json({ status: true, message: 'OK', data: event_user, current: page, pages: Math.ceil(events_number / perPage) })

        } catch (error) { returnError(res, error) }

    },

    listByUser: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params
        let perPage = 20;
        let page = req.query.page || 1;

        try {

            const user = await existById(models.user, user_id, 'id')
            var events_number = await models.workshop.count({ where: { user_id: user.id } })

            var events = await models.workshop.findAll({
                offset: (perPage * (page - 1)),
                limit: perPage,
                where: { user_id: user.id },
                attributes: [
                    'id', 'title', 'day',  [ Sequelize.fn( 'TIME_FORMAT', Sequelize.col('hour_start'),  '%h:%i %p'), 'hour_start' ],
                    [ Sequelize.fn( 'TIME_FORMAT', Sequelize.col('hour_end'),  '%h:%i %p'), 'hour_end' ], 'place', 'description', 'user_id'
                ]
            })

            return res.status(200).json({ status: true, message: 'OK', data: events, current: page, pages: Math.ceil(events_number / perPage) })

        } catch (error) { returnError(res, error) }

    },

    participating: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params

        try {
            
            const user = await existById(models.user, user_id)

            var events = await user.getToUserWorkshops({ attributes: [ 
                'id', 'title', 'day',  [ Sequelize.fn( 'TIME_FORMAT', Sequelize.col('hour_start'),  '%h:%i %p'), 'hour_start' ],
                    [ Sequelize.fn( 'TIME_FORMAT', Sequelize.col('hour_end'),  '%h:%i %p'), 'hour_end' ], 'place', 'description', 'user_id'
             ] })

            successful(res, 'OK', events)

        } catch (error) { returnError(res, error) }

    },

    create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { title, description, day, hour_start, hour_end, place, lat, lng, user_id, categories, participants } = req.body

        try {

            const user = await existById(models.user, user_id, 'id')

            var event = await models.workshop.create({
                title: title,
                description: description,
                day: day,
                hour_start: hour_start,
                hour_end: hour_end,
                place: place,
                lat: lat,
                lng: lng,
                user_id: user.id,
                participants:participants
            })

            var categories_id = await Promise.all(categories.map(async element => {
                var response = await createCategory(element)
                return await response.id
            }))

            await event.addToWorkshopCategories(categories_id)

            successful(res, text.successCreate('evento'))
            
        } catch (error) { returnError(res, error) }

    },

    update: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { event_id,  title, description, day, hour_start, hour_end, place, lat, lng, user_id, categories, participants } = req.body

        try {

            var event = await models.workshop.findOne({
                where: {
                    [ Sequelize.Op.and ]: [
                        { id: event_id },
                        { user_id: user_id }
                    ]
                }
            })
    
            if(!event) throw(text.notFoundElement)

            // await event.removeToWorkshopCategories([ 16, 17 ]);
            // var elements = await event.getToWorkshopCategories({ through: { where: { category_id: 18 } } });
    
            await event.update({
                title: title || event.title,
                description: description || event.description,
                day: day || event.day,
                hour_start: hour_start || event.hour_start,
                hour_end: hour_end || event.hour_end,
                place: place || event.place,
                lat: lat || event.lat,
                lng: lng || event.lng,
                participants: participants || event.participants
            })

            if ( categories && categories.length > 0) {

                await models.category_workshop.destroy({ where: { workshop_id: event.id } })

                var categories_id = await Promise.all(categories.map(async element => {
                    var response = await createCategory(element)
                    return await response
                }))
                
                await event.addToWorkshopCategories(categories_id)

            }

            successful(res, text.successUpdate('evento'));

        } catch (error) { returnError(res, error) }

    },

    takePart: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { event_id, user_id } = req.body

        try {
            
            var event = await existById(models.workshop, event_id)
            var pivot_exists = await models.user_workshop.findOne({ where: { user_id: user_id, workshop_id: event_id } })

            if (pivot_exists) {
                
                await pivot_exists.destroy()
                successful(res, text.removed)

            } else {

                var event_user = await models.user_workshop.count({ where: { workshop_id: event_id } })

                if (event_user.length > event.participants) 
                {
                    // sendEmail()
                    await event.addToWorkshopUser(user_id, { through: { status: 'PENDING' } })
                }
                else
                {
                    // sendEmail()
                    await event.addToWorkshopUser(user_id, { through: { status: 'ACCEPTED' } })
                }
                
                successful(res, text.add)

            }

        } catch (error) { returnError(res, error) }

    },

    delete: async (req, res) => {
        
        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { event_id } = req.params

        try {

            var event = await existById(models.workshop, event_id)

            await models.category_workshop.destroy({ where: { workshop_id: event.id } })
            await models.user_workshop.destroy({ where: { workshop_id: event.id } })
            await event.destroy()

            successful(res, text.successDelete('evento'))

        } catch (error) { returnError(res, error) }

    }

}