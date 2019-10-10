const Sequelize = require('sequelize')
const models = require('../models/index');
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
                    check('rating').exists().withMessage("Es necesario un puntaje").isNumeric().withMessage("El tipo de dato no es el adecuado.")
                ]
        }
    },

    comment:  (req, res) => {
        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).send({ status: false, message: "Data incorrecta, por favor intentelo nuevamente.", data: errors.array() });
        }
        
        const { review, from_user_id } = req.body
        const { to_user_id } = req.params

        models.user.findOne({ where: { id: to_user_id } })
        .then( user => {

            user.addFromUser(from_user_id, { through: { review: review, created_at: Date.now() } } )
            .then( comentario => {
                return res.status(200).json( { status: true, message: 'Comentario asignado correctamente.', data: {  } } )
            }).catch( err => {
                return res.status(500).json( { status: false, message: err.message, data: {  }  } )
            });

        })
        .catch( err => {
            return res.status(500).json( err )
        })

    },

    rating:  (req, res) => {
        var errors = validationResult(req)

        const { rating, from_user_id } = req.body
        const { to_user_id } = req.params

        if (!errors.isEmpty()) {
            return res.status(422).send({ status: false, message: "Data incorrecta, por favor intentelo nuevamente.", data: errors.array() });
        }
        
        models.user.findOne({ where: { id: to_user_id } })
        .then( user => {

            user.addFromUser(from_user_id, { through: { rating: rating, created_at: Date.now() } } )
            .then( rating => {
                return res.status(200).json( { status: true, message: 'Rating asignado correctamente.', data: { rating } } )
            }).catch( err => {
                return res.status(500).json( { status: false, message: err.message, data: {  }  } )
            });

        })
        .catch( err => {
            return res.status(500).json( err )
        })

    },

    ratingTotal: (req, res) => {
        const { to_user_id } = req.params
        
        models.review.findOne({
            where: { to_user_id: to_user_id  },
            attributes: [
                [  Sequelize.fn('sum', Sequelize.col('rating')), 'total'  ],
                [  Sequelize.fn('count', Sequelize.col('rating')), 'cantidad'  ],
            ]
        })
        .then( response => {
            return res.status(200).json(response)
        } )
        .catch( err => {
            return res.status(500).json( err )
        })
    }

}