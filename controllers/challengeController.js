const models = require('../models/index');
const index = require('../config/index');
const { getObject, putObject, getDownloadUrl } = require('../libs/aws-s3');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/step-icons';
const FILES_TIP_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/documentos/files_tip';
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

    createChallenge: async (req, res) => {
        var { startup_id, employee_id, tip_id, user_id, status, comment } = req.body
        const tip = await models.tip.findOne({ attributes: ['id', 'step_id'], where: { id: tip_id } });
        const step = await models.step.findOne({ attributes: ['id', 'stage_id'], where: { id: tip.step_id } });
        var option = {}
        if (startup_id !== null) {
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
        if (employee_id !== null) {
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
                                model: models.startup_step,
                                where: {
                                    startup_id: startup_id
                                }
                            },
                            {
                                model: models.challenge,
                                where: { startup_id: startup.id }
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
        const { step_id, startup_id } = req.query
        const startup = await models.startup.findOne({ attributes: ['id'], where: { id: startup_id } })
        console.log(startup)
        models.step.findOne({
            where: { id: step_id },
            include: [
                {
                    model: models.challenge,
                    where: { startup_id: startup.id },
                    include: [
                        {
                            model: models.tip,
                            include: [
                                { model: models.file_tip }
                            ]
                        }
                    ]
                }
            ]
        }).then(step => {
            return res.json({ status: true, message: "Listado de retos por nivel de la startup", data: step })
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Vuelva a intentarlo" })
        })
    },

    downloadFile: async (req, res) => {
        const { file } = req.params
        try {
            res.attachment(file);
            var fileStream = getObject(FILES_TIP_BUCKET_NAME, file)
            //fileStream.pipe(res)
            const url = getDownloadUrl(fileStream)
            return res.redirect(url)
        } catch (error) {
            return res.status(200).json({ status: false, message: error.message, data: {} })
        }
    },

    replyTip: async (req, res) => {
        var fileName = ""
        const { challenge_id, reply } = req.body
        var name = ""
        if (req.files) {
            var file = req.files.file;
            fileName = putObject(FILES_TIP_BUCKET_NAME, file);
            name = file.name
        }
        try {
            await models.sequelize.transaction(async (t) => {
                await models.challenge.update({
                    reply: reply,
                    date: Date.now(),
                }, { where: { id: challenge_id } }, { transaction: t });

                if (file) {
                    await models.file.create({
                        name: name,
                        file: fileName,
                        challenge_id: challenge_id
                    }, { transaction: t });
                }
                return res.json({ status: true, message: "Respuesta enviada correctamente" })
            });
        } catch (error) {
            console.log("Error" + error);
            res.status(200).json({ status: false, message: "Error al responder el reto" });
        }
    },

    listStageEmployee: async (req, res) => {
        const { user_id } = req.params
        const employee = await models.employee.findOne({ attributes: ['id', 'stage_id'], where: { id: user_id } })
        if (employee) {
            models.stage.findOne({
                where: {
                    id: employee.stage_id,
                    type: 'employee',
                },
                include: [
                    {
                        model: models.step,
                        include: [
                            {
                                model: models.employee_step,
                                where: { employee_id: employee.id }
                            },
                            {
                                model: models.challenge,
                                where: { employee_id: employee.id }
                            }
                        ]
                    }
                ]
            }).then(stage => {
                return res.json({ status: true, message: "Etapa actual con sus niveles", data: stage })
            }).catch(err => {
                console.log(err)
                return res.json({ status: false, message: "Ocurrio un problema, vuelva a intentarlo." })
            })
        } else {
            return res.json({ status: false, message: "No existe el inpulsor" })
        }
    }
}