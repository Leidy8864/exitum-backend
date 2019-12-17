const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

module.exports = {
    validate: (review) => {

        var user_id = check('user_id')
            .exists().withMessage('Es necesario el id del usuario que inicio sesión.')
            .isNumeric().withMessage("El tipo de dato no es el adecuado.")

        var startup_id = check('startup_id')
            .exists().withMessage("Es necesario el id del usuario al que se comentará o puntuar.")
            .isNumeric().withMessage("El tipo de dato no es el adecuado.")

        switch (review) {
            case 'recommendation':
                return [
                    user_id, startup_id,
                    check('recommendation').exists().withMessage("Es necesario agregar un comentario")
                ]
            case 'rating':
                return [
                    user_id, startup_id,
                    check('rating').exists().withMessage("Es necesario un puntaje")
                    .isNumeric().withMessage("El tipo de dato no es el adecuado.")
                    .custom(value=> value <= 5 && value > 0).withMessage("El valor debe estar entre el rango de 1 y 5.")
                ]
        }
    },

    recommendation:  async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }
        
        const { recommendation, user_id } = req.body
        const { startup_id } = req.params

        try 
        {
            const startup = await existById( models.startup, startup_id )
            startup.addToStartupUser( user_id, { through: { recommendation: recommendation, created_at: Date.now() } } )

            return successful(res, text.successCreate('comentario'), appointment);

        } catch (error) { return returnError(res, error) }

    },

    rating:  (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { rating, user_id } = req.body
        const { startup_id } = req.params
        
        models.startup.findOne( { where: { id: startup_id } } )
        .then(startup => {

            if ( !startup ) return res.status(200).json( { status: false, message: "Startup no existente", data: {  }  } )

            startup.addToStartupUser( user_id, { through: { rating: rating, created_at: Date.now() } } )
            .then( response => {

                models.review_startup.findOne({
                    where: { startup_id: startup_id  },
                    attributes: [
                        [  Sequelize.fn('sum', Sequelize.col('rating')), 'total'  ],
                        [  Sequelize.fn('count', Sequelize.col('rating')), 'cantidad'  ],
                    ]
                })
                .then(elements => {

                    var avg_rating = (elements.dataValues.total / elements.dataValues.cantidad).toFixed(2)
                    startup.update({ avg_rating: avg_rating })

                    return successful(res, text.successCreate('rating'))

                }).catch(error => { return returnError(res, error) })

            }).catch(error => { return returnError(res, error) })

        })

    }

}