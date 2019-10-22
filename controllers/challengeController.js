const models = require('../models/index');
const index = require('../config/index');
const s3 = require('../libs/aws-s3');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/step-icons';

const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        switch (method) {
            case 'createStage':
                return [
                    check('type', message_exists).exists().isIn(['employee', 'startup']),
                    check('stage', message_exists).exists(),
                    check('description', message_exists).exists()
                ]
            case 'createStep':
                return [
                    check('stage_id', message_exists).exists()
                ]
            case 'createTip':
                return [
                    check('step_id', message_exists).exists()
                ]
            case 'checkEmployee':
                return [
                    check('id', message_exists).exists(),
                    check('checked', message_exists).exists(),
                    check('tip_id', message_exists).exists()
                ]
            case 'checkStartup':
                return [
                    check('id', message_exists).exists(),
                    check('checked', message_exists).exists(),
                    check('tip_id', message_exists).exists(),
                    check('startup_id', message_exists).exists()
                ]
        }
    },

    createStage: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }
        const { stage, description, type } = req.body
        models.stage.findOne({ where: { stage: stage } }).then(st => {
            if (st) {
                res.json({ status: false, message: "El nombre de esta etapa ya existe" });
            } else {
                models.stage.create({
                    stage: stage,
                    description: description,
                    type: type
                }).then(stage => {
                    return res.json({ status: true, message: "Etapa creada correctamente.", data: stage })
                }).catch(err => {
                    return res.json({ status: false, message: err })
                });
            }
        })
    },

    createStep: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }
        const { stage_id } = req.body
        var fileName = '';
        if (req.files) {
            var photo = req.files.photo;
            fileName = s3.putObject(NEW_BUCKET_NAME, photo);
        }
        await models.step.create({
            icon: fileName,
            stage_id: stage_id
        }).then(step => {
            return res.json({ status: true, message: "Nivel creado correctamente.", data: step });
        }).catch(err => {
            return res.json({ status: false, message: err });
        });
    },

    createTip: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }
        const { tip, step_id } = req.body
        models.tip.create({
            tip: tip,
            step_id: step_id
        }).then(tip => {
            return res.status(200).json({ status: true, message: "Reto creado correctamente", data: tip });
        }).catch(err => {
            return res.json({ status: false, message: err });
        });
    },

    checkChallengeEmployee: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }
        const { id, tip_id, checked } = req.body
        try {
            models.employee.findOne({ where: { user_id: id } }).then(employee => {
                if (employee) {
                    employee.addTip(tip_id, { through: { checked: checked } }).then(check => {
                        if (check) {
                            return res.json({ status: true, message: 'Reto superado guardado correctamente.', data: { check } })
                        } else {
                            return res.json({ status: false, message: 'Reto superado sin guardar.' })
                        }
                    });
                } else {
                    return res.json({ status: false, message: "No existe el impulsor" })
                }
            })
        } catch (err) {
            res.status(200).json({ status: false, message: err });
        }
    },

    checkChallengeStartup: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectas, por favor intentelo nuevamente.", data: errors.array() });
        }
        const { id, checked, tip_id, startup_id } = req.body
        try {
            models.entrepreneur.findOne({ where: { user_id: id } }).then(entrepreneur => {
                if (entrepreneur) {
                    models.startup.findOne({ where: { id: startup_id, entrepreneur_id: entrepreneur.id } }).then(startup => {
                        if (startup) {
                            startup.addTip(tip_id, { through: { checked: checked } }).then(check => {
                                if (check) {
                                    return res.json({ status: true, message: 'Reto superado guardado correctamente.', data: { check } })
                                } else {
                                    return res.json({ status: false, message: 'No se efectuaron cambios.' })
                                }
                            })
                        } else {
                            return res.json({ status: false, message: 'No existe esta startup para el emprendedor.' })
                        }
                    })
                } else {
                    return res.json({ status: false, message: "No existe el emprendedor." })
                }
            })

        } catch (error) {
            res.status(200).json({ status: false, message: "Error al crear un reto para el empleado." });
        }
    },

    listChallengeEmployee: async (req, res) => {
        models.stage.findAll({
            where: { type: 'employee' },
            include: [
                {
                    model: models.step,
                    include: [
                        { model: models.tip }
                    ]
                }
            ]
        }).then(challenges => {
            if (challenges) {
                return res.json({ status: true, message: "Lista de retos del impulsor", data: challenges })
            } else {
                return res.json({ status: false, message: "No hay retos registrados" })
            }
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Error al listar retos", data: { err } })
        })
    },

    listChallengeStartup: async (req, res) => {
        models.stage.findAll({
            where: { type: 'startup' },
            include: [
                {
                    model: models.step,
                    include: [
                        { model: models.tip }
                    ]
                }
            ]
        }).then(challenges => {
            if (challenges) {
                return res.json({ status: true, message: "Lista de retos de la startup", data: challenges })
            } else {
                return res.json({ status: false, message: "No hay retos registrados" })
            }
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Error al listar retos", data: { err } })
        })
    },

    actualStage: async(req, res) => {
        const {startup_id} = req.params

        var js = {
            id_stage: 1,
            name_stage: "Presemilla", 
            step: [
                {
                    id_step: 1,
                    name_step: "ideación", 
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png"
                },
                {
                    id_step: 2,
                    name_step: "ideación2", 
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png"
                },
                {
                    id_step: 3,
                    name_step: "ideación3",
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png"
                },
                {
                    id_step: 4,
                    name_step: "ideación4",
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png"
                },
                {
                    id_step: 5,
                    name_step: "ideación5",
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png"
                },
            ]
        }
        return res.json({ status: true, message: "Stage actual con sus steps", data: JSON.stringify(js) })
    }
}