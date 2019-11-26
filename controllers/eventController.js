const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
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
        const event_id = check('event_id').exists().withMessage(text.id('evento'))
        const hour_end = check('hour_end').exists().withMessage(text.dateEnd)
        const hour_start=  check('hour_start').exists().withMessage(text.dateStart)
        const description = check('description').exists().withMessage(text.description)
        const categories = check('categories').exists().withMessage(text.category('evento'))

        switch (method) {
            case 'create':
                return [ title, day, place, user_id, hour_start, description, categories ]
            case 'list-by-user':
                return [ user_id ]
            case 'take-part':
                return [ event_id, user_id ]
            case 'update':
                return [ event_id, user_id ]
            case 'delete':
                return [ event_id ]
        }

    },

    listByUser: async (req, res) => {

        const { user_id } = req.params

        try {
            
            const user = await existById(models.user, user_id, 'id')

            var events = await models.workshop.findAll({ where: { user_id: user.id } })

            successful(res, 'OK', events)

        } catch (error) { returnError(res, error) }

    },

    create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { title, description, day, hour_start, hour_end, place, lat, lng, user_id, categories } = req.body

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
                participants: 50
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

        const { event_id } = req.params
        const { title, description, day, hour_start, hour_end, place, lat, lng, user_id, categories } = req.body

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
                participants: participants_max || event.participants
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
            var event_user = await event.getToWorkshopUsers()

            if (event_user.length > event.participants) 
                await event.addToWorkshopUser(user_id, { through: { status: 'PENDING' } })
            else 
                await event.addToWorkshopUser(user_id, { through: { status: 'ACCEPTED' } })
            
            successful(res, text.add)

        } catch (error) { returnError(res, error) }

    },

    delete: async (req, res) => {
        
        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { event_id } = req.params

        try {

            var event = await existById(event_id)

            await models.category_workshop.destroy({ where: { workshop_id: event.id } })
            await workshop.destroy()

            successful(res, text.successDelete('evento'))

        } catch (err) { returnError(res, error) }

    }

}