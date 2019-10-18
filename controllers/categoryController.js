const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('../controllers/elementController');
const { check, validationResult } = require('express-validator');


module.exports = {
    validate: (review) => {

        var from_user_id = check('from_user_id')
            .exists().withMessage('Es necesario el id del usuario que inicio sesión.')
            .isNumeric().withMessage("El tipo de dato no es el adecuado.")

        var to_user_id = check('to_user_id')
            .exists().withMessage("Es necesario el id del usuario al que se comentará o puntuar.")
            .isNumeric().withMessage("El tipo de dato no es el adecuado.")

        switch (review) {
            case 'comment':
                return [
                    from_user_id, to_user_id,
                    check('review').exists().withMessage("Es necesario agregar un comentario")
                ]
            case 'rating':
                return [
                    from_user_id, to_user_id,
                    check('rating').exists().withMessage("Es necesario un puntaje")
                    .isNumeric().withMessage("El tipo de dato no es el adecuado.")
                    .custom(value=> value <= 5 && value > 0).withMessage("El valor debe estar entre el rango de 1 y 5.")
                ]
        }
    },

    all:  async(req, res) => {
        try {
            var category = await models.category.findAll({});
            return res.status(200).json({ status: true, message: 'OK', data: category })
        } catch (err) {
            return res.status(500).json({ status: false, message: err.message, data: {} })
        }
    },

    search: (req, res) => {

        var { category } = req.body

        category = category.toLowerCase()

        models.category.findOrCreate({
            where: { name: { [Sequelize.Op.like]  : '%' + category + '%'} },
            defaults: {
                name:  category
            }
        })
        .spread((response, created) => {
            return res.status(200).json({ status: true, message: 'OK', data: response } )
        })

    }


}