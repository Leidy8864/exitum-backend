const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('../controllers/elementController');
const { check, validationResult } = require('express-validator');


module.exports = {
    all:  async(req, res) => {
        try {
            var area = await models.area.findAll({});
            return res.status(200).json({ status: true, message: 'OK', data: area })
        } catch (err) {
            return res.status(500).json({ status: false, message: err.message, data: {} })
        }
    },
}