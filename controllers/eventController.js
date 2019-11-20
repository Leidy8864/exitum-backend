const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
const { existById } = require('./elementController')
const { createCompany } = require('./companyController')
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('./responseController')
const { createCategory } = require('./categoryController')

module.exports = {

    validate: (method) => {

        var message_exists = 'No existe :v'
        const day = check('day').exists().withMessage(message_exists)
        const title = check('title').exists().withMessage(message_exists)
        const place = check('place').exists().withMessage(message_exists)
        const user_id = check('user_id').exists().withMessage(message_exists)
        const event_id = check('event_id').exists().withMessage(message_exists)
        const hour_end = check('hour_end').exists().withMessage(message_exists)
        const hour_start=  check('hour_start').exists().withMessage(message_exists)
        const description = check('description').exists().withMessage(message_exists)
        const categories = check('categories').exists().withMessage(message_exists)

        switch (method) {
            case 'create':
                return [ title, day, place, user_id, hour_end, hour_start, description, categories ]
            case 'update':
                return [ event_id, user_id ]
            case 'delete':
                return [ event_id, user_id ]
        }
        
    },

    create: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { title, description, day, hour_start, hour_end, place, lat, lng, user_id, categories } = req.body

        try {

            const user = await existById(models.user, user_id, 'id')

            // var event = await models.workshop.create({
            //     title: title,
            //     description: description,
            //     day: day,
            //     hour_start: hour_start,
            //     hour_end: hour_end,
            //     place: place,
            //     lat: lat,
            //     lng: lng,
            //     user_id: user.id
            // })

            var categories_id = await Promise.all(categories.map(async element => {
                var [ response, created ] = await models.category.findOrCreate({
                    where: { name: element },
                    defaults: { name: element }
                })
                return await response.id
            }))

            successful(res, text.createCompany('evento'), categories_id)
            
        } catch (error) { returnError(res, error) }

    },

    update: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { title, description, day, hour_start, hour_end, place, lat, lng, user_id, category_id, event_id } = req.body

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
    
            await event.update({
                title: title || event.title,
                description: description || event.description,
                day: day || event.day,
                hour_start: hour_start || event.hour_start,
                hour_end: hour_end || event.hour_end,
                place: place || event.place,
                lat: lat || event.lat,
                lng: lng || event.lng,
            })
            
        } catch (error) { returnError(res, error) }

    },

    delete: async (req, res) => {
        
        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { event_id } = req.params
        const { user_id } = req.body

        try {

            var event = await models.workshop.findOne({
                where: {
                    [ Sequelize.Op.and ] : [
                        { id: event_id },
                        { user_id: user_id }
                    ]
                }    
            });

            if(!event) throw(text.notFoundElement)

            await workshop.destroy()

            successful(res, text.successDelete('evento'))

        } catch (err) { returnError(res, error) }

    }

}