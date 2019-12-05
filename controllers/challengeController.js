const text = require('../libs/text')
const s3 = require('../libs/aws-s3');
const Sequelize = require('sequelize');
const models = require('../models/index');
const index = require('../config/index');
const { sendEmail } = require('../libs/mail')
const { existById } = require('../controllers/elementController');
const { getObject, putObject, getDownloadUrl, deleteObject } = require('../libs/aws-s3');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/step-icons';
const FILES_TIP_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/documentos/files_tip';
const FILES_TIP_REPLY_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/documentos/files_tip_reply';
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('./responseController')

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
            case 'verifyChallenge':
                return [
                    check('challenge_id', message_exists).exists(),
                    check('comment', message_exists).exists(),
                    check('status').exists().withMessage(message_exists).isIn([ 'Con observaciones', 'Verificado' ])
                    .withMessage(text.only('Con observaciones', 'Verificado')),
                    check('verifying_use', message_exists).exists()
                ]
            case 'deleteFile':
                return [
                    check('challenge_id', message_exists).exists(),
                    check('key_s3', message_exists).exists()
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
        if (!startup) { return res.json({ status: false, message: "La startup no esta registrada." }) }
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
                        },
                        {
                            model: models.file
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
            fileStream.pipe(res)
            //const url = getDownloadUrl(fileStream)
            //return res.redirect(url)
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
                const chll = await models.challenge.findOne({ where: { id: challenge_id } })
                if (chll.status === 'Verificado') { return res.json({ status: false, message: "Este reto fue verificado, no se puede editar." }) }
                await models.challenge.update({
                    reply: reply,
                    status: "Respondido",
                    date: Date.now(),
                }, { where: { id: challenge_id } }, { transaction: t });

                if (file) {
                    await models.file.create({
                        name: name,
                        key_s3: (fileName).split('/')[5],
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
        const employee = await models.employee.findOne({ attributes: ['id', 'stage_id'], where: { user_id: user_id } })
        console.log(employee.id)
        if (!employee) { return res.json({ status: false, message: "No existe impulsor con este usuario." }) }
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
                            where: { employee_id: employee.id },
                            required: false
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
    },

    listStepEmployee: async (req, res) => {
        const { step_id, user_id } = req.query
        const employee = await models.employee.findOne({ attributes: ['id'], where: { user_id: user_id } })
        if (!employee) { return res.json({ status: false, message: "No existe impulsor con este usuario." }) }
        models.step.findOne({
            where: { id: step_id },
            include: [
                {
                    model: models.challenge,
                    where: { employee_id: employee.id },
                    include: [
                        {
                            model: models.tip,
                            include: [
                                { model: models.file_tip }
                            ]
                        },
                        {
                            model: models.file
                        }
                    ]
                }
            ]
        }).then(step => {
            return res.json({ status: true, message: "Listado de retos por nivel del impulsor", data: step })
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Vuelva a intentarlo" })
        })
    },

    summaryTips: async (req, res) => {
        const { tip_id, user_id } = req.query
        let perPage = 6;
        console.log(user_id)
        const tip = await models.tip.findOne({ where: { id: tip_id } })
        if (!tip) { return res.json({ status: false, message: "El codigo del reto no exixte." }) }
        await models.challenge.findAll({
            limit: perPage,
            where: {
                tip_id: tip_id,
                checked: 1,
                user_id: { [models.Sequelize.Op.notIn]: [user_id] }
            },
            attributes: ['reply', 'date'],
            order: [
                ['date', 'DESC']
            ],
            include: [
                {
                    model: models.user,
                    attributes: ['id', 'name', 'lastname', 'photo']
                    // include: [
                    //     { model: models.employee}
                    // ]
                }
            ]
        }).then(tips => {
            return res.json({ status: true, message: "Reto cumplido por otros usuario", data: tips })
        })
    },

    deleteFileReply: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        try {

            const { challenge_id, key_s3 } = req.body

            var file = await models.file.findOne({
                where: {
                    [models.Sequelize.Op.and]: [
                        { challenge_id: challenge_id },
                        { key_s3: key_s3 }
                    ]
                }
            });

            if (!file) { return res.json({ status: false, message: "El nombre del archivo no exixte." }) }

            deleteObject(FILES_TIP_REPLY_BUCKET_NAME, key_s3);

            await file.destroy()

            successful(res, text.successDelete('archivo'))

        } catch (error) { returnError(res, error) }
    },

    showChallengesToVerify: async (req, res) => {
        const { user_id } = req.query
        let perPage = 20;
        let page = req.query.page || 1;

        const skll_usr = await models.skill_user.findAll({
            where: { user_id: user_id }
        })
        var skll_ids = []
        for (var i = 0; i < skll_usr.length; i++) {
            skll_ids.push(skll_usr[i].skill_id)
        }
        const challenges = await models.challenge.findAll({
            offset: (perPage * (page - 1)),
            limit: perPage,
            where: {
                status: 'Respondido',
            },
            attributes: ['id', 'date', 'reply', 'comment'],
            include: [
                {
                    model: models.user,
                    attributes: ['id','name', 'lastname', 'photo']
                },
                {
                    model: models.tip,
                    include: [
                        {
                            model: models.tip_skill,
                            where: {
                                skill_id: {
                                    [models.Sequelize.Op.in]: skll_ids
                                }
                            },
                            required: true
                        },
                        {
                            model: models.file_tip
                        }
                    ],
                    required: true
                },
                {
                    model: models.file
                }
            ]
        })
        const totalRows = await models.challenge.findAll({
            distinct: true,
            where: {
                status: 'Respondido',
            },
            attributes: ['id'],
            include: [
                {
                    model: models.tip,
                    attributes: ['id'],
                    include: [
                        {
                            model: models.tip_skill,
                            where: {
                                skill_id: {
                                    [models.Sequelize.Op.in]: skll_ids
                                }
                            },
                            required: true
                        }
                    ],
                    required: true
                }
            ]
        }).catch(err => {
            console.log(err)
        })
        console.log(challenges.length)
        console.log(totalRows.length)
        return res.json({ status: true, message: "Retos para verificar.", data: challenges, current: page, pages: Math.ceil(totalRows.length / perPage) })
    },

    verifyChallenge: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { challenge_id, comment, status, verifying_user } = req.body

        try 
        {
    
            var update_challenge = await existById(models.challenge, challenge_id)

            await update_challenge.update({
                comment: comment,
                date: Date.now(),
                status: status,
                checked: (status == 'Verificado') ? 1 : 0,
                verifying_user: verifying_user
            })

            const challenge = await models.challenge.findOne({ 
                where: { id: challenge_id },
                include: [
                    {
                        model: models.user,
                        as: 'ownerChallenge',
                        attributes: [ 'id', [ Sequelize.fn('CONCAT', Sequelize.col('ownerChallenge.name'), ' ', Sequelize.col('ownerChallenge.lastname')), 'fullname' ], 'email']
                    },
                    {
                        model: models.user,
                        as: 'verifyingChallenge',
                        attributes: [ 'id', [ Sequelize.fn('CONCAT', Sequelize.col('verifyingChallenge.name'), ' ', Sequelize.col('verifyingChallenge.lastname')), 'fullname' ], 'email', 'photo' ]
                    },
                    {
                        model: models.tip,
                    }
                ]
            })

            if (status == 'Con observaciones')
            {
                const email_info = { to: challenge.ownerChallenge.email, subject: text.challengeValidation, template: 'template-challenge' }
                const data_send = { 
                    reto: challenge.tip.tip, validador: challenge.verifyingChallenge.dataValues.fullname, comentario: challenge.comment, 
                    estado: text.incorrectState, mensaje_estado:text.messageIncorrectState, photo: 'verde.png', 
                    user_photo: (challenge.verifyingChallenge.photo) ? challenge.verifyingChallenge.photo : text.manProfileImage 
                }
                sendEmail(email_info, data_send)
            } 

            if (status == 'Verificado') 
            {
                const email_info = { to: challenge.ownerChallenge.email, subject: text.challengeValidation, template: 'template-challenge' }
                const data_send = { 
                    reto: challenge.tip.tip, estado: text.correctState, mensaje_estado: text.messageCorrectState, comentario: challenge.comment,
                    photo: 'verde.png', user_photo: (challenge.verifyingChallenge.photo) ? challenge.verifyingChallenge.photo : text.manProfileImage 
                }
                sendEmail(email_info, data_send)
            }
    
            successful(res, text.succesful_validation)

        } catch (error) { returnError(res, error) }

    }
}