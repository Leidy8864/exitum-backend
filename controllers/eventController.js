const text = require('../libs/text')
const s3 = require('../libs/aws-s3');
const Sequelize = require('sequelize');
const index = require('../config/index');
const models = require('../models/index');
const { sendEmail } = require('../libs/mail')
const { existById } = require('./elementController')
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('./responseController')
const { createCategory } = require('./categoryController')
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/event-image';
const Excel = require('exceljs');

module.exports = {

    validate: (method) => {

        const day = check('day').exists().withMessage(text.day('evento'))
        const title = check('title').exists().withMessage(text.title('evento'))
        const place = check('place').exists().withMessage(text.place('evento'))
        const user_id = check('user_id').exists().withMessage(text.id('evento del usuario'))
        const user_data = check('user').exists().withMessage(text.id('evento del usuario'))
        const event_id = check('event_id').exists().withMessage(text.id('evento'))
        const hour_end = check('hour_end').exists().withMessage(text.dateEnd)
        const hour_start = check('hour_start').exists().withMessage(text.dateStart)
        const description = check('description').exists().withMessage(text.description)
        const categories = check('categories').exists().withMessage(text.category('evento'))
        const participants = check('participants').exists().withMessage(text.participants)

        switch (method) {
            case 'create':
                return [title, day, place, user_id, hour_start, description, categories, participants]
            case 'list-by-user':
                return [user_id]
            case "event-id":
                return [event_id]
            case 'list-by-user-id':
                return [user_data]
            case 'take-part':
                return [event_id, user_id]
            case 'update':
                return [event_id, user_id]
            case 'delete':
                return [event_id]
        }

    },

    listAll: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        let perPage = 20;
        let user = req.query.user
        let page = req.query.page || 1;

        try {
            var events_number = await models.workshop.count({ where: { user_id: { [Sequelize.Op.ne]: user } } })

            var response = await models.workshop.findAll({
                where: {
                    user_id: { [Sequelize.Op.ne]: user },
                },
                include: [
                    {
                        model: models.user,
                        as: 'toWorkshopUsers',
                        attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('toWorkshopUsers.name'), ' ', Sequelize.col('lastname')), 'fullname'], 'photo']
                    },
                    {
                        model: models.category,
                        as: 'toWorkshopCategories'
                    }
                ],
                attributes: [
                    'id', 'title', 'day', [Sequelize.fn('TIME_FORMAT', Sequelize.col('hour_start'), '%h:%i %p'), 'hour_start'], 'photo',
                    [Sequelize.fn('TIME_FORMAT', Sequelize.col('hour_end'), '%h:%i %p'), 'hour_end'], 'place', 'description', 'user_id',
                    'participants'
                ]
            })

            var filter = response.reduce((element, option) => {
                var user_exists = (option.toWorkshopUsers).find(data => data.id == user);
                if (!user_exists) {
                    var data = {
                        id: option.id, title: option.title, day: option.day, hour_start: option.hour_start,
                        hour_end: option.hour_end, place: option.place, description: option.description,
                        user_id: option.user_id, participants: option.participants, photo: option.photo,
                        participants_count: `${option.toWorkshopUsers.length}/${option.participants}`,
                        toWorkshopUsers: option.toWorkshopUsers, toWorkshopCategories: option.toWorkshopCategories
                    }
                    element.push(data)
                }
                return element
            }, [])

            var events = filter.slice(((page - 1) * perPage), (page * perPage))

            return res.status(200).json({ status: true, message: 'OK', data: events, current: page, pages: Math.ceil(filter.length / perPage) })

        } catch (error) { return returnError(res, error) }

    },

    show: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { event_id } = req.params

        try {
            var response = await models.workshop.findByPk(event_id, {
                include: [
                    {
                        model: models.user,
                        as: 'toWorkshopUsers',
                        attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('toWorkshopUsers.name'), ' ', Sequelize.col('lastname')), 'fullname'], 'photo'],
                    },
                    {
                        model: models.category,
                        as: 'toWorkshopCategories'
                    }
                ],
                attributes: [
                    'id', 'title', 'day', 'hour_start', 'hour_end', 'place', 'description', 'user_id', 'participants', 'photo'
                ],
            })

            var event = {
                id: response.id, title: response.title, day: response.day, hour_start: response.hour_start,
                hour_end: response.hour_end, place: response.place, description: response.description,
                user_id: response.user_id, participants: response.participants, photo: response.photo,
                participants_count: `${response.toWorkshopUsers.length}/${response.participants}`,
                toWorkshopUsers: response.toWorkshopUsers, toWorkshopCategories: response.toWorkshopCategories
            }

            return successful(res, 'OK', event)

        } catch (error) { return returnError(res, error) }

    },

    participatingEvents: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { event_id } = req.params
        const perPage = 12;
        let page = req.query.page || 1;

        try {
            var events_number = await models.user_workshop.count({ where: { workshop_id: event_id } })
            const event = await existById(models.workshop, event_id)
            var event_user = await event.getToWorkshopUsers({
                offset: (perPage * (page - 1)),
                limit: perPage,
                attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('name'), ' ', Sequelize.col('lastname')), 'fullname'], 'photo']
            })

            return res.status(200).json({ status: true, message: 'OK', data: event_user, current: page, pages: Math.ceil(events_number / perPage) })

        } catch (error) { return returnError(res, error) }

    },

    listByUser: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params
        let perPage = 20;
        let page = req.query.page || 1;

        try {
            const user = await existById(models.user, user_id, 'id')
            var events_number = await models.workshop.count({ where: { user_id: user.id } })

            var response = await models.workshop.findAll({
                offset: (perPage * (page - 1)),
                limit: perPage,
                where: { user_id: user.id },
                attributes: [
                    'id', 'title', 'day', [Sequelize.fn('TIME_FORMAT', Sequelize.col('hour_start'), '%h:%i %p'), 'hour_start'],
                    [Sequelize.fn('TIME_FORMAT', Sequelize.col('hour_end'), '%h:%i %p'), 'hour_end'], 'place', 'description', 'user_id',
                    'participants', 'photo'
                ],
                include: [
                    {
                        model: models.user,
                        as: 'toWorkshopUsers',
                        attributes: ['id']
                    },
                ]
            })

            var events = await Promise.all(response.map(async element => {
                return {
                    id: element.id, title: element.title, day: element.day, hour_start: element.hour_start,
                    hour_end: element.hour_end, place: element.place, description: element.description,
                    user_id: element.user_id, participants: element.participants, photo: element.photo,
                    participants_count: `${element.toWorkshopUsers.length}/${element.participants}`
                }
            }))

            return res.status(200).json({ status: true, message: 'OK', data: events, current: page, pages: Math.ceil(events_number / perPage) })

        } catch (error) { return returnError(res, error) }

    },

    participating: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params

        try {
            const user = await existById(models.user, user_id)

            var response = await user.getToUserWorkshops({
                attributes: [
                    'id', 'title', 'day', [Sequelize.fn('TIME_FORMAT', Sequelize.col('hour_start'), '%h:%i %p'), 'hour_start'],
                    [Sequelize.fn('TIME_FORMAT', Sequelize.col('hour_end'), '%h:%i %p'), 'hour_end'], 'place', 'description', 'user_id',
                    'participants', 'photo'
                ],
                include: [
                    {
                        model: models.user,
                        as: 'toWorkshopUsers',
                        attributes: ['id']
                    },
                ]
            })

            var events = await Promise.all(response.map(async element => {
                return {
                    id: element.id, title: element.title, day: element.day, hour_start: element.hour_start,
                    hour_end: element.hour_end, place: element.place, description: element.description,
                    user_id: element.user_id, participants: element.participants, photo: element.photo,
                    participants_count: `${element.toWorkshopUsers.length}/${element.participants}`
                }
            }))

            return successful(res, 'OK', events)

        } catch (error) { return returnError(res, error) }

    },

    create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

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
                participants: (participants) ? participants : 50
            })

            if (req.files) {
                var photo = req.files.photo;
                fileName = s3.putObject(NEW_BUCKET_NAME, photo);
                await event.update({ photo: fileName });
            }
            console.log(categories)
            if (categories) {
                if (categories instanceof Array) {
                    var categories_id = await Promise.all(categories.map(async element => {
                        var response = await createCategory(element)
                        return await response.id
                    }))
                    await event.addToWorkshopCategories(categories_id)
                } else {
                    console.log("entro")
                    var response = await createCategory(categories)
                    console.log("response"+response)
                    await event.addToWorkshopCategories(response.id)
                }
            }

            return successful(res, text.successCreate('evento'), categories)

        } catch (error) { return returnError(res, error) }

    },

    update: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { event_id, title, description, day, hour_start, hour_end, place, lat, lng, user_id, categories, participants } = req.body

        try {
            var event = await models.workshop.findOne({
                where: {
                    [Sequelize.Op.and]: [
                        { id: event_id },
                        { user_id: user_id }
                    ]
                }
            })

            if (!event) throw (text.notFoundElement)

            // await event.removeToWorkshopCategories([ 16, 17 ]);
            // var elements = await event.getToWorkshopCategories({ through: { where: { category_id: 18 } } });

            var photo = event.photo

            if (req.files) {
                if (photo && photo != '' && !photo.indexOf(index.aws.s3.BUCKET_NAME)) {
                    s3.deleteObject(NEW_BUCKET_NAME, (photo).split('/')[5]);
                }

                var portada = req.files.photo;
                photo = s3.putObject(NEW_BUCKET_NAME, portada);
            }


            await event.update({
                title: title || event.title,
                description: description || event.description,
                day: day || event.day,
                hour_start: hour_start || event.hour_start,
                hour_end: hour_end || event.hour_end,
                place: place || event.place,
                lat: lat || event.lat,
                lng: lng || event.lng,
                participants: participants || event.participants,
                photo: photo
            })

            if (categories && categories.length > 0) {

                await models.category_workshop.destroy({ where: { workshop_id: event.id } })

                var categories_id = await Promise.all(categories.map(async element => {
                    var response = await createCategory(element)
                    return await response
                }))

                await event.addToWorkshopCategories(categories_id)

            }

            return successful(res, text.successUpdate('evento'));

        } catch (error) { return returnError(res, error) }

    },

    takePart: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { event_id, user_id } = req.body

        try {
            var event = await models.workshop.findByPk(event_id, {
                attributes: ['id', 'title', 'description', [Sequelize.fn('Date_format', Sequelize.col('day'), "%W %M %e %Y"), 'day'],
                    [Sequelize.fn('TIME_FORMAT', Sequelize.col('hour_start'), '%h:%i %p'), 'hour_start'], 'place', 'participants', 'photo']
            })
            if (!event) throw text.notFoundElement

            const user = await existById(models.user, user_id)
            var pivot_exists = await models.user_workshop.findOne({ where: { user_id: user_id, workshop_id: event_id } })

            if (pivot_exists) {

                await pivot_exists.destroy()
                return successful(res, text.removed)

            } else {

                var event_user = await models.user_workshop.count({ where: { workshop_id: event_id } })
                const email_info = { to: user.email, subject: text.eventParticipation(event.title), template: 'template-event' }

                if (event_user > event.participants) {
                    await event.addToWorkshopUser(user_id, { through: { status: 'PENDING' } })

                    const data_send = {
                        fecha: event.dataValues.day, hora: event.dataValues.hour_start,
                        titulo: event.title, direccion: event.place, descripcion: event.description,
                        mensaje: text.message_event(`${user.name} ${user.lastname}`, 'esta pendiente de aceptación.Te enviaremos un correo con la confirmación')
                    }
                    sendEmail(email_info, data_send)
                }
                else {
                    await event.addToWorkshopUser(user_id, { through: { status: 'ACCEPTED' } })

                    const data_send = {
                        fecha: event.dataValues.day, hora: event.dataValues.hour_start,
                        titulo: event.title, direccion: event.place, descripcion: event.description,
                        mensaje: text.message_event(`${user.name} ${user.lastname}`, 'ha sido aceptada')
                    }
                    sendEmail(email_info, data_send)
                }

                return successful(res, text.add)

            }

        } catch (error) { return returnError(res, error) }

    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { event_id } = req.params

        try {
            var event = await existById(models.workshop, event_id)

            await models.category_workshop.destroy({ where: { workshop_id: event.id } })
            await models.user_workshop.destroy({ where: { workshop_id: event.id } })
            await event.destroy()

            return successful(res, text.successDelete('evento'))

        } catch (error) { return returnError(res, error) }

    },


    downloadEventParticipants: async (req, res) => {

        const { event_id } = req.params;
        const event = await existById(models.workshop, event_id);
        res.setHeader('Content-disposition', `attachment; filename=lista_participantes-${event.title}.xlsx`);
        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        var workbook = new Excel.stream.xlsx.WorkbookWriter({ stream: res, useStyles: true });
        var worksheet = workbook.addWorksheet(`Participantes-${event.title}`);
        worksheet.columns = [
            { header: 'Participante', key: 'participant', width: 30, style: { font: { name: "Calibri" } } },
            { header: 'Estado', key: 'state', width: 30, style: { font: { name: "Calibri" } } },
        ];
        var borders = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
        worksheet.getCell("A1").border = borders;
        worksheet.getCell("B1").border = borders;
        try {
            var event_user = await event.getToWorkshopUsers({
                attributes: ['id', 'name', 'lastname', 'photo']
            })

            for (var i in event_user) {
                let state = ""
                switch (event_user[i].user_workshop.status) {
                    case "ACCEPTED":
                        state = "Aceptado"
                        break;
                    case "PENDING":
                        state = "En lista de espera"
                    case "REJECTED":
                        state = "En lista de espera"

                    default:
                        break;
                }
                worksheet.addRow({ participant: event_user[i].name + ' ' + event_user[i].lastname, state: state });
            }
            worksheet.commit();
            workbook.commit();

        } catch (error) {
            return returnError(res, error);
        }
    }

}
