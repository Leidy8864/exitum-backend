const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('../controllers/elementController');
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('../controllers/responseController');


module.exports = {
    validate: (review) => {

        const id_stage = check('id_stage')
            .exists().withMessage('Es necesario el id del stage.')
            .isNumeric().withMessage("El tipo de dato no es el adecuado.")
        const stage = check('stage').exists().withMessage("Es necesario el nombre para el stage")
        const type = check('type').exists().withMessage("Es necesario un tipo de stage")
            .isIn([ 'startup', 'employee' ]).withMessage("Solamente se aceptan :employee o :startup como parámetros")

        switch (review) {
            case 'show':
                return [ type ]
            case 'create':
                return [ stage, type ]
            case 'update':
                return [ id_stage, stage, type ]
        }
    },

    list: async (req, res) => {

        try {
            var stage = await models.stage.findAll({})
            return res.status(200).json({ status: true, message: "OK", data:  [ stage[0] ] })

        } catch (err) { returnError(res, error) }

    },
    all: async (req, res) => {

        try 
        {
            const stage = await models.stage.findAll({})
            successful(res, 'OK', stage)

        } catch (err) { returnError(res, error) }

    },

    show: async (req, res) => {

        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Data incorrecta, por favor intentelo nuevamente.", data: errors.array() });
        }

        const { type } = req.params

        try {
            var stage = await models.stage.findAll({ 
                where: { type: type }
             })
            return res.status(200).json({ status: true, message: "OK", data:  stage })
        } catch (err) {
            return res.status(500).json({ status: false, message: err.message, data: {} })
        }
    },

    create: (req, res) => {

        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Data incorrecta, por favor intentelo nuevamente.", data: errors.array() });
        }

        const { stage, description, type } = req.body

        models.stage.create({
            stage: stage,
            description: description,
            type:type
        })
        .then(response => {
            return res.status(200).json({ status: true, message: "OK", data:  response})
        })
        .catch(err => { 
            return res.status(500).json({ status: false, message: err.message, data: {} })
         })
    },
    
    update: async(req, res) => {
        
        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Data incorrecta, por favor intentelo nuevamente.", data: errors.array() });
        }

        const { stage, description, type } = req.body
        const { id_stage } = req.params

        try {
            const user = await existById( models.stage, id_stage )
            user.update( {
                stage: stage,
                description: description,
                type: type
            } )
        } catch (err) {
            return res.status(500).json({ status: false, message: err.message, data: {} })
        }
           
    }


}