'use strict'
var models = require('../models/index')
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        switch (method) {
            case 'create': {
                return [
                    check('id').exists(),
                    check('name', 'El campo nombre no puede estar vacio').exists(),
                    check('description', 'El campo descripcion no puede estar vacio').exists(),
                    check('sector_id', 'Eliga un sector').exists()
                ]
            }
            case 'update': {
                return [
                    check('id').exists(),
                    check('name', 'El campo nombre no puede estar vacio').exists(),
                    check('description', 'El campo descripcion no puede estar vacio').exists(),
                    check('sector_id', 'Eliga un sector').exists(),
                    check('startup_id').exists()
                ]
            }
        }
    },

    create: (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        var id = req.body.id //id del usuario emprendedor
        var name = req.body.name
        var photo_url = req.body.photo_url
        var ruc = req.body.ruc
        var description = req.body.description
        var category_id = req.body.category_id
        var stage_id = req.body.stage_id

        models.entrepreneur.findOne({ where: { user_id: id } }).then(entrepreneur => {
            if (entrepreneur) {
                models.startup.create({
                    name: name,
                    photo_url: photo_url,
                    ruc: ruc,
                    description: description,
                    sector_id: sector_id,
                    stage_id: stage_id,
                    entrepreneur_id: entrepreneur.id
                }).then(startup => {
                    if (startup) {
                        res.status(200).send({ msg: "Startup creado correctamente" })
                    }
                });
            } else {
                res.status(201).send({ msg: "No existe emprendedor con este usuario" })
            }
        });
    },

    update: (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        var id = req.body.id //id del usuario emprendedor
        var name = req.body.name
        var photo_url = req.body.photo_url
        var ruc = req.body.ruc
        var description = req.body.description
        var sector_id = req.body.sector_id
        var startup_id = req.body.startup_id

        models.entrepreneur.findOne({ where: { user_id: id } }).then(entrepreneur => {
            if (entrepreneur) {
                models.startup.findOne({ where: { id: startup_id, entrepreneur_id: entrepreneur.id } }).then(startup => {
                    if (startup) {
                        models.startup.update({
                            name: name,
                            photo_url: photo_url,
                            ruc: ruc,
                            description: description,
                            sector_id: sector_id,
                        }, { where: { id: startup_id } }).then(startup => {
                            if (startup) {
                                res.status(200).send({ msg: "Startup actualizado correctamente" })
                            }
                        });
                    } else {
                        res.status(201).send({ msg: "No existe startup con este id " })
                    }
                });
            } else {
                res.status(201).send({ msg: "No existe emprendedor con este usuario" })
            }
        });
    },

    detail: (req, res) => {
        var id = req.body.id //id del usuario emprendedor
        var startup_id = req.body.startup_id

        models.entrepreneur.findOne({ where: { user_id: id } }).then(entrepreneur => {
            if (entrepreneur) {
                models.startup.findOne({
                    where: {
                        entrepreneur_id: entrepreneur.id,
                        id: startup_id
                    },
                    include: [
                        {
                            model: models.entrepreneur,
                            include: [
                                { model: models.user }
                            ]
                        }
                    ]
                },

                ).then(startup => {
                    if (!startup) return res.status(400).send({ msg: 'No existe la startup' });
                    res.status(200).send({ startup: startup })
                })
            } else {
                res.status(201).send({ msg: 'No existe emprededor con este usuario' })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json(err)
        })
    },

    listById: (req, res) => {
        var id = req.body.id //id del usuario emprendedor
        models.entrepreneur.findOne({ where: { user_id: id } }).then(entrepreneur => {
            if (entrepreneur) {
                models.startup.findAll({ where: { entrepreneur_id: entrepreneur.id } }).then(startups => {
                    if (!startups) return res.status(400).send({ msg: 'No tiene startups creados' });
                    res.status(200).send({ startups: startups })
                })
            } else {
                res.status(201).send({ msg: 'No existe emprededor con este usuario' })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json(err)
        })
    },

    list: (req, res) => {
        var id = req.body.id //id del usuario emprendedor
        models.startup.findAll().then(startups => {
            if (!startups) return res.status(400).send({ msg: 'No tiene startups creados' });
            res.status(200).send({ startups: startups })
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json(err)
        })
    },

    listSector: (req, res) => {
        models.sector.findAll().then(sectors => {
            if (sectors) {
                res.status(200).send({ sectors: sectors })
            } else {
                res.status(201).send({ msg: "No hay sectores" })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json(err)
        })
    }
}