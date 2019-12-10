const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

module.exports = {

    all:  async(req, res) => {

        const perPage = 20;
        let page = req.query.page || 1;

        try 
        {
            const number_tips = await models.tip.count()

            const tip = await models.tip.findAll({
                offset: (perPage * (page - 1)),
                limit: perPage,
                include: [
                    { model: models.step }
                ]
            });

            return res.status(200).json({ status: true, message: 'OK', data: tip, current: page, pages: Math.ceil(number_tips / perPage) })

        } catch (error)  {  returnError(res, error) } 

    },

    create: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { name } = req.body

        try {

            await createArea(name)
            successful(res, text.successCreate('area'))
            
        } catch(error) { returnError(res, error) }

    }
}