const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

module.exports = {

    all:  async(req, res) => {

        try 
        {
            const tip = await models.tip.findAll({});
            successful(res, 'OK', tip)
            
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