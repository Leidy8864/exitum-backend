const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

module.exports = {

    validate: (method) => {

        const tip = check('tip').exists().withMessage(text.tip)
        const tip_id = check('tip_id').exists().withMessage(text.id('tip'))
        const description = check('title').exists().withMessage(text.description)
        const step_id = check('place').exists().withMessage(text.id('step'))

        switch (method) {
            case 'create':
                return [tip, description, step_id]
            case 'update':
                return [tip_id]
            case 'delete':
                return [tip_id]
        }

    },

    all: async (req, res) => {

        const perPage = 20;
        let page = req.query.page || 1;

        try {
            const number_tips = await models.tip.count()

            const tip = await models.tip.findAll({
                offset: (perPage * (page - 1)),
                limit: perPage,
                include: [
                    { model: models.step }
                ]
            });

            return res.status(200).json({ status: true, message: 'OK', data: tip, current: page, pages: Math.ceil(number_tips / perPage) })

        } catch (error) { return returnError(res, error) }

    },

    listByStep: async (req, res) => {
        const { step_id } = req.query
        const tips = await models.tip.findAll({
            where: {
                step_id: step_id
            }
        })
        return res.json({ status: true, message: "Listado de retos por nivel", data: tips })
    },

    create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { tip, description, step_id } = req.body

        try {
            await models.tip.create({
                tip: tip,
                description: description,
                step_id: step_id
            })

            return successful(res, text.successCreate('tip'))

        } catch (error) { return eturnError(res, error) }

    },

    update: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { tip_id, tip, description, step_id } = req.body

        try {
            var tip_data = await existById(models.tip, tip_id)

            tip_data.update({
                tip: tip,
                description: description,
                step_id: step_id
            })

            return successful(res, text.successUpdate('tip'))

        } catch (error) { returnError(res, error) }

    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { tip_id } = req.body

        try {
            var tip_data = await existById(models.tip, tip_id)
            await tip_data.destroy()

            return successful(res, text.successDelete('tip'))

        } catch (error) { return returnError(res, error) }

    }
}