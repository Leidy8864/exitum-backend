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
                        models.challenges.create
                    })
                } else {
                    return res.json({ status: false, message: "No existe el emprendedor." })
                }
            })
        } catch (error) {
            res.status(200).json({ status: false, message: "Error al registrar el reto completado." });
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

    actualStage: async (req, res) => {
        const { startup_id } = req.params

        var js = {
            id_stage: 1,
            name_stage: "Presemilla",
            step: [
                {
                    id_step: 1,
                    name_step: "ideación",
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
                    icon_count_tip: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/4-reto.svg"
                },
                {
                    id_step: 2,
                    name_step: "ideación2",
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
                    icon_count_tip: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/3-reto.svg"
                },
                {
                    id_step: 3,
                    name_step: "ideación3",
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
                    icon_count_tip: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/2-reto.svg"
                },
                {
                    id_step: 4,
                    name_step: "ideación4",
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
                    icon_count_tip: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/1-reto.svg"
                },
                {
                    id_step: 5,
                    name_step: "ideación5",
                    icon: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
                    icon_count_tip: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg"
                },
            ]
        }
        return res.json({ status: true, message: "Stage actual con sus steps", data: js })
    },

    createChallenge: async (req, res) => {
        var { startup_id, employee_id, tip_id, user_id, status, comment } = req.body
        const tip = await models.tip.findOne({ attributes: ['id', 'step_id'], where: { id: tip_id } });
        const step = await models.step.findOne({ attributes: ['id', 'stage_id'], where: { id: tip.step_id } });
        var option = {}
        if (employee_id !== null) {
            option = {
                user_id: user_id,
                startup_id: startup_id,
                tip_id: tip_id,
                step_id: tip.step_id,
                stage_id: step.stage_id,
                status: status,
                checked: true,
                date: Date.now(),
                comment: comment,
            }
        }
        if (startup_id == null) {
            option = {
                user_id: user_id,
                employee_id: employee_id,
                tip_id: tip_id,
                step_id: tip.step_id,
                stage_id: step.stage_id,
                status: status,
                checked: true,
                date: Date.now(),
                comment: comment,
            }
        }

        models.challenge.create(option).then(challenge => {
            if (challenge) {
                return res.json({ status: true, message: "Reto validado registrado correctamente", data: challenge })
            }
        }).catch(err => {
            return res.json({ status: false, data: err })
        })
    },

    listStageStartup: async (req, res) => {
        const { startup_id } = req.params
        const startup = await models.startup.findOne({ where: { id: startup_id } })
        if (startup) {
            models.stage.findOne({
                where: {
                    id: startup.stage_id,
                    type: 'startup',
                },
                include: [
                    {
                        model: models.step,
                        include: [
                            {
                                model: models.challenge,
                                where: { startup_id: startup.id },
                                //attributes: [{ icon_tip_count: "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/4-reto.svg" }]
                                // required: false,
                                // where: [
                                //     { checked: true }
                                // ],
                                // attributes: [
                                //     [models.Sequelize.fn('COUNT', models.Sequelize.col('checked')), 'cantidad']
                                // ]
                            }
                        ]
                    }
                ]
            }).then(stage => {
                return res.json({ status: true, message: "Etapa actual con sus niveles", data: stage })
            }).catch(err => {
                console.log(err)
                return res.json({ status: false, message: { err } })
            })
        } else {
            return res.json({ status: false, message: "No existe startup" })
        }
    },

    listStepStartup: async (req, res) => {
        const { startup_id } = req.params
        const startup = await models.startup.findOne({ attributes: ['id', 'stage_id'], where: { id: startup_id } })
        const step = await models.step.findOne({ where: { stage_id: startup.stage_id } })
        models.step.findOne({
            where: { id: step.id },
            include: [
                {
                    model: models.challenge,
                    where: { startup_id: startup.id }
                }
            ]
        }).then(step => {
            return res.json({ status: true, message: "Listado de retos por nivel de la startup", data: step })
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Vuelva a intentarlo" })
        })
    },

    detailTip: async (req, res) => {
        const { startup_id, tip_id } = req.query
        models.tip.findOne({
            where: { id: tip_id },
            include: [
                {
                    model: models.challenge,
                    where: {
                        startup_id: startup_id
                    },
                    include: [
                        { model: models.file }
                    ]
                }
            ]
        }).then(tip => {
            return res.json({ status: true, message: "Detalle del reto", data: tip })
        })
    },

    listTipsEmployee: async (req, res) => {
        const { employee_id } = req.params
    }
}