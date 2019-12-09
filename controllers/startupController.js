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
                    check('category_id', 'Eliga una categoria correcta.').exists()
                ]
            }
            case 'update': {
                return [
                    check('id').exists(),
                    check('name', 'El campo nombre no puede estar vacio').exists(),
                    check('description', 'El campo descripcion no puede estar vacio').exists(),
                    check('category_id', 'Eliga una categoria correcta').exists(),
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
        var ruc = req.body.ruc
        var description = req.body.description
        var category_id = req.body.category_id
        var stage_id = req.body.stage_id

        try {
            const entrepreneur = await models.entrepreneur.findOne({ where: { user_id: id } });

            if (entrepreneur) {
                const fileName = ""
                if (req.files) {
                    fileName = s3.putObject(NEW_BUCKET_NAME, req.files.photo);
                }
                const startup = await models.startup.findOne({ where: { name: name, id: entrepreneur.id } });
                if (startup) {
                    return res.json({ status: false, message: "Este nombre ya esta en uso" });
                } else {
                    var chlls = []
                    var steps = []
                    await models.sequelize.transaction(async (t) => {
                        const startup = await models.startup.create({
                            name: name,
                            photo_url: fileName,
                            ruc: ruc,
                            description: description,
                            category_id: category_id,
                            stage_id: stage_id,
                            entrepreneur_id: entrepreneur.id
                        }, { transaction: t });

                        await models.stage.findAll({
                            where: {
                                type: 'startup'
                            },
                            include: [
                                {
                                    model: models.step,
                                    include: [
                                        {
                                            model: models.tip
                                        }
                                    ]
                                }
                            ]
                        }, { transaction: t }).then(stages => {
                            for (var x = 0; x < stages.length; x++) {
                                for (var y = 0; y < stages[x].steps.length; y++) {
                                    for (var z = 0; z < stages[x].steps[y].tips.length; z++) {
                                        chlls.push(
                                            {
                                                user_id: id,
                                                startup_id: startup.id,
                                                stage_id: stages[x].id,
                                                step_id: stages[x].steps[y].id,
                                                tip_id: stages[x].steps[y].tips[z].id,
                                                checked: false,
                                                status: "Sin respuesta",
                                                date: Date.now()
                                            }
                                        )
                                    }

                                    steps.push(
                                        {
                                            startup_id: startup.id,
                                            step_id: stages[x].steps[y].id,
                                            tip_completed: 0,
                                            icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                            state: 'incompleto'
                                        }
                                    )
                                }
                            }
                        })
                        await models.challenge.bulkCreate(chlls, { transaction: t });
                        await models.startup_step.bulkCreate(steps, { transaction: t });
                    });
                    return res.json({ status: true, message: "Startup creado correctamente" });
                }
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
                            res.json({ status: true, message: "Startup actualizado correctamente" })
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
                    res.json({ status: true, startups: startups })
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
            res.json({ status: true, message: 'Ok', data: { startups: startups } })
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json(err)
        })
    },

    listSector: (req, res) => {
        models.sector.findAll().then(sectors => {
            if (sectors) {
                res.json({ status: true, message: 'Ok', data: { sectors: sectors } })
            } else {
                res.json({ status: false, message: "No hay sectores" })
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.status(400).json({ status: false, message: err })
        })
    }
}