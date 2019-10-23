const models = require('../models/index');
const { check, validationResult } = require('express-validator');

module.exports = {
    findHourId: async (unavailable) => {
        try {
            
            var idHours = []

            var hour = await models.hour.findAll({
                where: { hour: unavailable },
                attributes: [ 'id' ]
            })
            
            hour.map(element => {
                idHours.push(element.id)
            })

            return idHours

        } catch (error) {
            res.json({
                status: false,
                message: error.message,
                data: {  }
            });
        }
    }
}