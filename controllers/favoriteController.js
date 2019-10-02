'use strict'
var models = require('../models/index')
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        switch (method) {
            case 'chosen': {
                return [
                    check('chosen', 'Tiene que ser 0 o 1').isInt()
                ]
            }

            case 'list': {
                return [
                    check('id').exists()
                ]
            }
        }
    },

    createFavorite: function (req, res) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        var id = req.body.id
        var user_id = req.body.user_id 
        var chosen = req.body.chosen

        selector = { where: { from_user_id: id, to_user_id: user_id } }
        models.favorite.create({
            from_user_id: id,
            to_user_id: user_id,
            chosen: chosen
        }).then(favorite => {
            if (favorite) {
                res.status(200).json({ message: "Usuario favorito creado" })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(500).json({ msg: err.message })
        })
    },

    updateFavorite: function (req, res) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        var id = req.body.id
        var user_id = req.body.user_id
        var chosen = req.body.chosen

        selector = { where: { from_user_id: id, to_user_id: user_id } }
        new_favorite = { chosen: chosen }

        models.favorite.update(new_favorite, selector).then(new_favorite => {
            if(new_favorite){
                res.status(200).json({ message: "Usuario favorito actualizado" })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(500).json({ msg: err.message })
        })
    },

    listFavorites: function (req, res) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        var id = req.body.id
        selector = { where: { from_user_id: id, chosen: true } }
        models.favorite.finAll(selector).then(favorites => {
            if (favorites) {
                res.status(200).json({ favorites: favorites })
            } else {
                res.status(201).json({ message: "No tiene favoritos" })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(500).json({ msg: err.message })
        })
    }
}