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

    comment:  async (req, res) => {
        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Data incorrecta, por favor intentelo nuevamente.", data: errors.array() });
        }
        
        const { review, from_user_id } = req.body
        const { to_user_id } = req.params

        try {

            const user = await existById( models.user, to_user_id )
            user.addFromUser( from_user_id, { through: { review: review, created_at: Date.now() } } )

            return res.status(200).json( { status: true, message: 'Comentario asignado correctamente.', data: {  } } )

        } catch ( err ) {
            return res.status(500).json( { status: false, message: err.message, data: { err }  } )
        }

    },

    rating:  (req, res) => {
        var errors = validationResult(req)

        const { rating, from_user_id } = req.body
        const { to_user_id } = req.params

        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Data incorrecta, por favor intentelo nuevamente.", data: errors.array() });
        }

        models.user.findOne( { where: { id: to_user_id } } )
        .then(user => {

            if ( !user )
                return res.status(200).json( { status: false, message: "Usuario no existente", data: {  }  } )

            user.addFromUser( from_user_id, { through: { rating: rating, created_at: Date.now() } } )
            .then( response => {

                models.review.findOne({
                    where: { to_user_id: to_user_id  },
                    attributes: [
                        [  Sequelize.fn('sum', Sequelize.col('rating')), 'total'  ],
                        [  Sequelize.fn('count', Sequelize.col('rating')), 'cantidad'  ],
                    ]
                })
                .then(elements => {
                    var avg_rating = (elements.dataValues.total / elements.dataValues.cantidad).toFixed(2)
                    user.update({ avg_rating: avg_rating })
                    return res.status(200).json( { status: true, message: 'Rating asignado correctamente.', data: {  } }  )
                })
                .catch( err => {
                    return res.status(500).json( { status: false, message: err.message, data: err  } )
                })

            })
            .catch(err => {
                return res.status(500).json( { status: false, message: err.message, data: err  } )
            })

        })

    }

}