'use strict'
const models = require('../models/index')
const s3 = require('../libs/aws-s3');
const index = require('../config/index');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/startup-profile';

const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        switch (method) {
            case 'create': {
                return [
                    check('id').exists(),
                    check('name', 'El campo nombre no puede estar vacio').exists(),
                    check('description', 'El campo descripcion no puede estar vacio').exists(),
                    check('category_id', 'Eliga un sector').exists()
                ]
            }
            case 'update': {
                return [
                    check('id').exists(),
                    check('name', 'El campo nombre no puede estar vacio').exists(),
                    check('description', 'El campo descripcion no puede estar vacio').exists(),
                    check('category_id', 'Eliga un sector').exists(),
                    check('startup_id').exists()
                ]
            }
        }
    },

    create: async (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.json({ status: false, message: 'Campos incorrectos', data: errors.array() }) }

        var id = req.body.id //id del usuario emprendedor
        var name = req.body.name
        var photo = req.files.photo;
        var ruc = req.body.ruc
        var description = req.body.description
        var category_id = req.body.category_id
        var stage_id = req.body.stage_id

        try {
            const entrepreneur = await models.entrepreneur.findOne({ where: { user_id: id } });

            if (entrepreneur) {
                const fileName = ""
                if (photo) {
                    fileName = s3.putObject(NEW_BUCKET_NAME, photo);
                }
                await models.startup.findOne({ where: { name: name, id: entrepreneur.id } }).then(sta => {
                    if (sta) {
                        return res.json({ status: false, message: "Este nombre ya esta en uso" });
                    } else {
                        await models.startup.create({
                            name: name,
                            photo_url: fileName,
                            ruc: ruc,
                            description: description,
                            category_id: category_id,
                            stage_id: stage_id,
                            entrepreneur_id: entrepreneur.id
                        });
                        return res.json({ status: 200, message: "Startup creado correctamente" });
                    }
                });
            } else {
                return res.json({ status: false, message: "No existe el usuario" })
            }
        } catch (error) {
            console.log("Errrror", error);
            return res.json({ status: false, message: "Error al crear la startup", data: { error } });
        }
    },

    update: async (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { return res.json({ status: false, message: 'Campos incorrectos', data: errors.array() }) }

        var id = req.body.id //id del usuario emprendedor
        var name = req.body.name
        var photo = req.files.photo;
        var ruc = req.body.ruc
        var description = req.body.description
        var category_id = req.body.category_id
        var startup_id = req.body.startup_id

        try {
            const entrepreneur = await models.entrepreneur.findOne({ where: { user_id: id } });

            if (entrepreneur) {

                if (entrepreneur.photo) {
                    s3.deleteObject(NEW_BUCKET_NAME, entrepreneur.photo);
                }
                const fileName = ""
                if (photo) {
                    fileName = s3.putObject(NEW_BUCKET_NAME, photo);
                }
                const startup = await models.startup.findOne({ where: { id: startup_id, entrepreneur_id: entrepreneur.id } });

                if (startup) {
                    models.startup.update({
                        name: name,
                        photo_url: fileName,
                        ruc: ruc,
                        description: description,
                        category_id: category_id,
                    }, { where: { id: startup.id } }).then(startup => {
                        if (startup) {
                            res.json({ status: 200, message: "Startup actualizado correctamente" })
                        } else {
                            res.json({ status: false, message: "No se pudo actualizar" })
                        }
                    });
                }
            } else {
                return res.json({ status: false, message: "No existe el emprendedor" })
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json({ status: false, message: err });
        }
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
                    if (!startup) return res.status(400).json({ status: false, message: 'No existe la startup' });
                    res.json({ startup: startup })
                })
            } else {
                res.json({ status: false, message: 'No existe emprededor con este usuario' })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json({ status: false, message: err })
        })
    },

    listById: (req, res) => {
        var id = req.body.id //id del usuario emprendedor
        models.entrepreneur.findOne({ where: { user_id: id } }).then(entrepreneur => {
            if (entrepreneur) {
                models.startup.findAll({ where: { entrepreneur_id: entrepreneur.id } }).then(startups => {
                    if (!startups) return res.json({ status: false, message: 'No tiene startups creados' });
                    res.json({ status: 200, startups: startups })
                })
            } else {
                res.json({ status: false, message: 'No existe emprededor con este usuario' })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json({ status: false, message: err })
        })
    },

    list: (req, res) => {
        models.startup.findAll().then(startups => {
            if (!startups) return res.json({ status: false, message: 'No tiene startups creados' });
            res.json({ status: 200, message: 'Ok', data: { startups: startups } })
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json(err)
        })
    },

    listSector: (req, res) => {
        models.sector.findAll().then(sectors => {
            if (sectors) {
                res.json({ status: 200, message: 'Ok', data: { sectors: sectors } })
            } else {
                res.json({ status: false, message: "No hay sectores" })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json({ status: false, message: err })
        })
    }
}