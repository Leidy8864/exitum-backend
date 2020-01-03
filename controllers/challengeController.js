const fs = require('fs')
var moment = require('moment');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const text = require('../libs/text')
const s3 = require('../libs/aws-s3');
const Sequelize = require('sequelize');
const models = require('../models/index');
const index = require('../config/index');
const { sendEmail } = require('../libs/mail')
const { existById, updateOrCreate } = require('../controllers/elementController');
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
                    check('status').exists().withMessage(message_exists).isIn(['Con observaciones', 'Verificado', 'Verificando'])
                        .withMessage(text.only('Con observaciones', 'Verificado', 'Verificando')),
                    check('verifying_user', message_exists).exists()
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
        } else {
            return res.json({ status: false, message: "Es necesario subir un icono." })
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
        try {
            const stepFind = await models.step.findOne({
                where: { id: step_id },
                attributes: ['id'],
                include: [{
                    model: models.stage,
                    attributes: ['id', 'type']
                }]
            }).catch(err => {
                console.log(err)
            })
            const typeUser = stepFind.stage.type
            const result = await models.sequelize.transaction(async (t) => {
                const tipNew = await models.tip.create({
                    tip: tip,
                    step_id: step_id
                }, { transaction: t })

                if (typeUser == "startup") {
                    const startups = await models.startup.findAll({
                        attributes: ['id'],
                        include: [
                            { model: models.entrepreneur }
                        ]
                    })
                    var chlls = []
                    var stp_step = []
                    for (var i = 0; i < startups.length; i++) {
                        chlls.push({
                            user_id: startups[i].entrepreneur.user_id,
                            startup_id: startups[i].id,
                            stage_id: stepFind.stage.id,
                            step_id: stepFind.id,
                            tip_id: tipNew.id,
                            checked: false,
                            status: "Sin respuesta"
                        })
                        const startup_step = await models.startup_step.findOne({
                            where: {
                                startup_id: startups[i].id,
                                step_id: stepFind.id
                            }
                        })
                        if (!startup_step) {
                            stp_step.push({
                                startup_id: startups[i].id,
                                step_id: stepFind.id,
                                tip_completed: 0,
                                icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                state: 'incompleto'
                            })
                        }
                    }
                    await models.challenge.bulkCreate(chlls, { transaction: t });
                    await models.startup_step.bulkCreate(stp_step, { transaction: t });
                } else if (typeUser == "employee") {
                    const employees = await models.employee.findAll({
                        attributes: ['id', 'user_id'],
                    })
                    var chlls = []
                    var emp_step = []
                    for (var i = 0; i < employees.length; i++) {
                        chlls.push({
                            user_id: employees[i].user_id,
                            employee_id: employees[i].id,
                            stage_id: stepFind.stage.id,
                            step_id: stepFind.id,
                            tip_id: tipNew.id,
                            checked: false,
                            status: "Sin respuesta",
                            date: Date.now()
                        })
                        const employee_step = await models.employee_step.findOne({
                            where: {
                                employee_id: employees[i].id,
                                step_id: stepFind.id
                            }
                        })
                        if (!employee_step) {
                            emp_step.push({
                                employee_id: employees[i].id,
                                step_id: stepFind.id,
                                tip_completed: 0,
                                icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                state: 'incompleto'
                            })
                        }
                    }
                    await models.challenge.bulkCreate(chlls, { transaction: t });
                    await models.employee_step.bulkCreate(emp_step, { transaction: t });
                } else {
                    return res.json({ status: false, message: "El nivel pertenece a una estapa que no especifico el usuario al que pertenece el reto." })
                }
                return tipNew
            })
            return res.status(200).json({ status: true, message: "Reto creado correctamente", data: result });
        } catch (err) {
            console.log(err);
            return res.json({ status: false, message: "Lo sentimos, vuelva a intentarlo." });
        }
    },

    createChallenge: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }
        const { stage, description_stage, type, stage_id, step, tip, description_tip, step_id, skills, categories } = req.body

        var st
        var stageFind = null
        var typeUser = null
        try {
            const result = await models.sequelize.transaction(async (t) => {
                var st = null
                if (stage) {
                    st = await models.stage.findOne({ where: { stage: stage } })
                }
                var stageNew
                var stepNew
                var tipNew
                var fileName = '';

                if (st) {
                    res.json({ status: false, message: "El nombre de esta etapa ya existe" });
                } else {
                    if (stage_id === "undefined") {
                        stageNew = await models.stage.create({
                            stage: stage,
                            description: description_stage,
                            type: type
                        }, { transaction: t }).catch(err => console.log(err))
                    }

                    if (step_id === "undefined") {
                        if (req.files) {
                            var photo = req.files.photo;
                            fileName = s3.putObject(NEW_BUCKET_NAME, photo);
                        } else { return res.json({ status: false, message: "Es necesario subir un icono." }) }

                        stepNew = await models.step.create({
                            icon: fileName,
                            step: step,
                            stage_id: stage_id !== "undefined" ? stage_id : stageNew.id
                        }, { transaction: t }).catch(err => console.log(err))
                    }

                    if (stage_id !== "undefined") {
                        stageFind = await models.stage.findOne({
                            where: { id: stage_id }
                        })
                        typeUser = stageFind.type
                    } else {
                        typeUser = stageNew.type
                    }

                    tipNew = await models.tip.create({
                        tip: tip,
                        description: description_tip,
                        step_id: step_id !== "undefined" ? step_id : stepNew.id
                    }, { transaction: t }).catch(err => { console.log(err) })

                    if (skills) {
                        var skills_id = await Promise.all(skills.map(async element => {
                            var [response, created] = await models.skill.findOrCreate({
                                where: { skill: { [models.Sequelize.Op.like]: '%' + element + '%' } },
                                defaults: {
                                    skill: element
                                }
                            })
                            return await response.id
                        }), { transaction: t })
                        await tipNew.addSkill(skills_id, { transaction: t });
                    }

                    if (categories) {
                        var categories_id = await Promise.all(categories.map(async element => {
                            var [response, created] = await models.category.findOrCreate({
                                where: { name: { [models.Sequelize.Op.like]: '%' + element + '%' } },
                                defaults: {
                                    name: element
                                }
                            })
                            return await response.id
                        }), { transaction: t })
                        await tipNew.addCategory(categories_id, { transaction: t });
                    }

                    if (typeUser == "startup") {
                        const startups = await models.startup.findAll({
                            attributes: ['id'],
                            include: [
                                { model: models.entrepreneur }
                            ]
                        })
                        var chlls = []
                        var stp_step = []
                        for (var i = 0; i < startups.length; i++) {
                            chlls.push({
                                user_id: startups[i].entrepreneur.user_id,
                                startup_id: startups[i].id,
                                stage_id: stage_id !== "undefined" ? stage_id : stageNew.id,
                                step_id: step_id !== "undefined" ? step_id : stepNew.id,
                                tip_id: tipNew.id,
                                checked: false,
                                status: "Sin respuesta",
                                date: Date.now()
                            })
                            const startup_step = await models.startup_step.findOne({
                                where: {
                                    startup_id: startups[i].id,
                                    step_id: step_id !== "undefined" ? step_id : stepNew.id,
                                }
                            })
                            if (!startup_step) {
                                stp_step.push({
                                    startup_id: startups[i].id,
                                    step_id: step_id !== "undefined" ? step_id : stepNew.id,
                                    tip_completed: 0,
                                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                    state: 'incompleto'
                                })
                            }
                        }
                        await models.challenge.bulkCreate(chlls, { transaction: t });
                        await models.startup_step.bulkCreate(stp_step, { transaction: t });
                    } else if (typeUser == "employee") {
                        const employees = await models.employee.findAll({
                            attributes: ['id', 'user_id'],
                        })
                        var chlls = []
                        var emp_step = []
                        for (var i = 0; i < employees.length; i++) {
                            chlls.push({
                                user_id: employees[i].user_id,
                                employee_id: employees[i].id,
                                stage_id: stage_id !== "undefined" ? stage_id : stageNew.id,
                                step_id: step_id !== "undefined" ? step_id : stepNew.id,
                                tip_id: tipNew.id,
                                checked: false,
                                status: "Sin respuesta",
                                date: Date.now()
                            })
                            const employee_step = await models.employee_step.findOne({
                                where: {
                                    employee_id: employees[i].id,
                                    step_id: step_id !== "undefined" ? step_id : stepNew.id
                                }
                            })
                            if (!employee_step) {
                                emp_step.push({
                                    employee_id: employees[i].id,
                                    step_id: step_id !== "undefined" ? step_id : stepNew.id,
                                    tip_completed: 0,
                                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                    state: 'incompleto'
                                })
                            }
                        }
                        await models.challenge.bulkCreate(chlls, { transaction: t });
                        await models.employee_step.bulkCreate(emp_step, { transaction: t });
                    } else {
                        return res.json({ status: false, message: "El nivel pertenece a una estapa que no especifico el usuario al que pertenece el reto." })
                    }
                    return res.json({ status: true, message: "Reto creado correctamente", data: tipNew });
                }
            });
        } catch (err) {
            console.log(err);
            return res.json({ status: false, message: "Lo sentimos, vuelva a intentarlo." });
        }
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
                        where: { status: 1 },
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
                    where: {
                        startup_id: startup.id,
                    },
                    include: [
                        {
                            model: models.tip,
                            order: ['id'],
                            include: [{ model: models.file_tip }]
                        },
                        {
                            model: models.file,
                            required: false
                        },
                        {
                            model: models.query,
                            as: 'replies',
                            where: {
                                active: 1
                            },
                            required: false
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
        const { challenge_id, reply, replies } = req.body
        var name = ""
        if (req.files) {
            var file = req.files.file;
            fileName = putObject(FILES_TIP_BUCKET_NAME, file);
            name = file.name
        }
        try {
            await models.sequelize.transaction(async (t) => {
                const chll = await models.challenge.findOne({ where: { id: challenge_id } })
                if (!chll) {
                    res.json({ status: false, message: "No existe el reto" })
                } else {
                    if (chll.status === 'Verificado') { return res.json({ status: false, message: "Este reto fue verificado, no se puede editar." }) }
                    await models.challenge.update({
                        reply: reply,
                        status: 'Verificando',
                        date_completed: Date.now(),
                    }, { where: { id: challenge_id } }, { transaction: t }).catch(err => { console.log(err) });

                    if (file) {
                        await models.file.create({
                            name: name,
                            key_s3: (fileName).split('/')[5],
                            challenge_id: challenge_id
                        }, { transaction: t });
                    }

                    if (replies) {
                        if (replies instanceof Array) {
                            await Promise.all(replies.map(async (reply) => {
                                var str = reply;
                                var jsonReply = JSON.parse(str);
                                if (jsonReply.id) {
                                    await models.reply.update({
                                        reply: jsonReply.reply
                                    }, { where: { id: jsonReply.id } }, { transaction: t }).catch(err => { console.log(err) })
                                }
                            }))
                        } else {
                            var str = replies;
                            var jsonReply = JSON.parse(str);
                            if (jsonReply.id) {
                                await models.reply.update({
                                    reply: jsonReply.reply
                                }, { where: { id: jsonReply.id } }, { transaction: t }).catch(err => { console.log(err) })
                            }
                        }
                    }
                    return res.json({ status: true, message: "Respuesta enviada correctamente" })
                }

            });
        } catch (error) {
            console.log("Error" + error);
            res.json({ status: false, message: "Por favor, vuelva a intentarlo." });
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
                    where: { status: 1 },
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
                            order: ['id'],
                            include: [
                                { model: models.file_tip }
                            ]
                        },
                        {
                            model: models.file
                        },
                        {
                            model: models.query,
                            as: 'replies',
                            where: {
                                active: 1
                            },
                            required: false
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
                    as: 'ownerChallenge',
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
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

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

            return successful(res, text.successDelete('archivo'))

        } catch (error) { return returnError(res, error) }

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

        const exp_usr = await models.experience.findAll({
            where: { user_id: user_id },
            attributes: ['user_id', 'category_id', 'id']
        })
        var exp_ids = []
        for (var i = 0; i < exp_usr.length; i++) {
            exp_ids.push(exp_usr[i].category_id)
        }

        const challenges = await models.challenge.findAll({
            offset: (perPage * (page - 1)),
            limit: perPage,
            where: {
                status: 'Verificando',
                user_id: { [models.Sequelize.Op.notIn]: [user_id] }
            },
            attributes: ['id', 'date', 'reply', 'comment', 'status'],
            include: [
                {
                    model: models.user,
                    as: 'ownerChallenge',
                    attributes: ['id', 'name', 'lastname', 'photo']
                },
                {
                    model: models.tip,
                    order: ['id'],
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
                            model: models.tip_category,
                            where: {
                                category_id: {
                                    [models.Sequelize.Op.in]: exp_ids
                                }
                            },
                            required: false
                        },
                        {
                            model: models.file_tip,
                            required: true
                        },
                        {
                            model: models.query,
                            where: {
                                active: 1
                            },
                            required: false
                        }
                    ],
                    required: true
                },
                {
                    model: models.file
                },
                {
                    model: models.startup,
                    required: true
                },
                {
                    model: models.stage,
                    required: true
                },
                {
                    model: models.step,
                    where: {
                        status: 1
                    },
                    required: true
                },
            ]
        })
        const totalRows = await models.challenge.findAll({
            distinct: true,
            where: {
                status: 'Verificando',
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
                },
                {
                    model: models.step,
                    where: {
                        status: 1
                    },
                    required: true
                }
            ]
        }).catch(err => {
            console.log(err)
        })
        return res.json({ status: true, message: "Retos para verificar.", data: challenges, current: page, pages: Math.ceil(totalRows.length / perPage) })
    },

    verifyChallenge: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { challenge_id, comment, status, verifying_user } = req.body

        try {
            var update_challenge = await existById(models.challenge, challenge_id)

            await update_challenge.update({
                comment: comment,
                date: Date.now(),
                status: status,
                checked: (status == 'Verificado') ? 1 : 0,
                verifying_user: verifying_user
            })

            if (update_challenge.employee_id !== null) {
                const challenges = await models.challenge.findAll({
                    where: {
                        employee_id: update_challenge.employee_id,
                        step_id: update_challenge.step_id,
                        status: 'verificado'
                    }
                })
                var employee_step = await models.employee_step.findOne({
                    where: {
                        employee_id: update_challenge.employee_id,
                        step_id: update_challenge.step_id
                    }
                })
                countNew = challenges.length
                await employee_step.update({
                    tip_completed: countNew,
                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/' + countNew + '-reto.svg',
                    state: countNew >= 4 ? 'completado' : 'incompleto'
                })
            } else if (update_challenge.startup_id !== null) {
                const challenges = await models.challenge.findAll({
                    where: {
                        startup_id: update_challenge.startup_id,
                        step_id: update_challenge.step_id,
                        status: 'verificado'
                    }
                })
                var startup_step = await models.startup_step.findOne({
                    where: {
                        startup_id: update_challenge.startup_id,
                        step_id: update_challenge.step_id
                    }
                })
                countNew = challenges.length
                await startup_step.update({
                    tip_completed: countNew,
                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/' + (countNew >= 4 ? 4 : countNew) + '-reto.svg',
                    state: countNew >= 4 ? 'completado' : 'incompleto'
                })
            }

            const challenge = await models.challenge.findOne({
                where: { id: challenge_id },
                include: [
                    {
                        model: models.user,
                        as: 'ownerChallenge',
                        attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('ownerChallenge.name'), ' ', Sequelize.col('ownerChallenge.lastname')), 'fullname'], 'email']
                    },
                    {
                        model: models.user,
                        as: 'verifyingChallenge',
                        attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('verifyingChallenge.name'), ' ', Sequelize.col('verifyingChallenge.lastname')), 'fullname'], 'email', 'photo']
                    },
                    {
                        model: models.tip,
                    }
                ]
            })

            const email_info = { to: challenge.ownerChallenge.email, subject: text.challengeValidation, template: 'template-challenge' }

            if (status == 'Con observaciones') {
                const data_send = {
                    reto: challenge.tip.tip, validador: challenge.verifyingChallenge.dataValues.fullname, comentario: challenge.comment,
                    estado: text.incorrectState, mensaje_estado: text.messageIncorrectState, photo: 'verde.png',
                    user_photo: (challenge.verifyingChallenge.photo) ? challenge.verifyingChallenge.photo : text.manProfileImage
                }
                sendEmail(email_info, data_send)
            }

            if (status == 'Verificado') {
                const data_send = {
                    reto: challenge.tip.tip, estado: text.correctState, mensaje_estado: text.messageCorrectState, comentario: challenge.comment,
                    photo: 'verde.png', user_photo: (challenge.verifyingChallenge.photo) ? challenge.verifyingChallenge.photo : text.manProfileImage
                }
                sendEmail(email_info, data_send)
            }

            return successful(res, text.succesful_validation)

        } catch (error) { return returnError(res, error) }

    },

    listSteps: async (req, res) => {
        const { stage_id } = req.query
        if (!stage_id) {
            models.step.findAll({ where: { status: true } }).then(steps => {
                res.json({ status: true, message: "Lista de niveles", data: steps })
            })
        } else {
            models.step.findAll({
                where: { stage_id: stage_id, status: true }
            }).then(steps => {
                res.json({ status: true, message: "Lista de niveles", data: steps })
            })
        }
    },

    uploadExcel: async (req, res) => {
        var exceltojson;
        const messageFileInvalid = "Error el formato del archivo no es válido, solo se admite archivos Excel";

        if (req.files) {
            var messageAlert = null
            var file = req.files.file;
            var datetimestamp = Date.now();
            const fileName = datetimestamp + '-' + file.name;

            if (!file.name.match(/\.(xls|xlsx)$/)) {
                return res.json({ status: false, message: messageFileInvalid })
            }
            await file.mv('./uploads/' + fileName, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("uploaded");
                    if (fileName.match(/\.(xlsx)$/)) {
                        exceltojson = xlsxtojson;
                    } else {
                        exceltojson = xlstojson;
                    }
                    try {
                        exceltojson({
                            input: `./uploads/${fileName}`,
                            output: null,
                            lowerCaseHeaders: true
                        }, async (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.json({ status: false, message: err, data: null });
                            }
                            await models.sequelize.transaction(async (t) => {
                                var duracion_dias = 0
                                for (var x = 0; x < result.length; x++) {
                                    duracion_dias = parseInt(result[x].duracion_dias) + duracion_dias
                                    if (!['startup', 'employee'].includes(result[x].tipo.toLowerCase())) {
                                        return res.json({ status: false, message: "El campo tipo solo puede ser 'startup' o 'employee'." })
                                    }
                                    if (!['pre semilla', 'semilla', 'temprana', 'crecimiento', 'expansión', 'etapa 1 empleado'].includes(result[x].etapa.toLowerCase())) {
                                        return res.json({ status: false, message: "El campo 'etapa' solo pueden tener los siguientes valores: 'Pre semilla', 'Semilla', 'Temprana', 'Crecimiento', 'Expansión', 'Etapa 1 empleado'." })
                                    }
                                    if (result[x].etapa.length > 0 && result[x].tipo.length > 0 && result[x].nivel.length > 0 && result[x].reto.length > 0) {
                                        var stageNew = await models.stage.findOrCreate({
                                            where: {
                                                stage: result[x].etapa,
                                                type: result[x].tipo
                                            }, transaction: t
                                        })
                                        await models.step.findOrCreate({
                                            where: {
                                                step: result[x].nivel,
                                                stage_id: stageNew[0].dataValues.id
                                            }, transaction: t
                                        }).spread(async (stepNew, created) => {
                                            if (created) {
                                                for (var i = 0; i < 4; i++) {
                                                    await models.tip.create({
                                                        tip: "Reto número " + (i + 1),
                                                        step_id: stepNew.id
                                                    }, { transaction: t })
                                                }
                                            }
                                            var tipNew = await models.tip.findOne({
                                                where: {
                                                    step_id: stepNew.id,
                                                    description: null
                                                },
                                                transaction: t
                                            })
                                            if (tipNew === null) {
                                                messageAlert = ", pero el nivel '" + result[x].nivel + "'  de la etapa '" + result[x].etapa + "' ya tiene cuatro retos creados, edite los retos en el panel de administrador o cree un nuevo nivel"
                                            }
                                            if (tipNew) {
                                                const tipFind = await models.tip.findOne({
                                                    where: {
                                                        tip: result[x].reto,
                                                        description: result[x].reto_descripcion,
                                                        step_id: stepNew.id
                                                    },
                                                    transaction: t
                                                })
                                                if (!tipFind) {
                                                    tipNew.update({
                                                        tip: result[x].reto,
                                                        description: result[x].reto_descripcion,
                                                        step_id: stepNew.id,
                                                        duration_days: result[x].duracion_dias
                                                    }, { transaction: t })
                                                    if (result[x].tipo == "startup") {
                                                        var startups = await models.startup.findAll({
                                                            attributes: ['id'],
                                                            include: [
                                                                { model: models.entrepreneur }
                                                            ],
                                                            transaction: t
                                                        });
                                                        var chlls = [];
                                                        var stp_step = [];
                                                        for (var i = 0; i < startups.length; i++) {
                                                            chlls.push({
                                                                user_id: startups[i].entrepreneur.user_id,
                                                                startup_id: startups[i].id,
                                                                stage_id: stageNew[0].dataValues.id,
                                                                step_id: stepNew.id,
                                                                tip_id: tipNew.dataValues.id,
                                                                checked: false,
                                                                status: "Sin respuesta",
                                                                date: Date.now(),
                                                                date_max: moment(Date.now()).add(result[x].duracion_dias, 'd').toDate()
                                                            });
                                                            var startup_step = await models.startup_step.findOne({
                                                                attributes: ['startup_id'],
                                                                where: {
                                                                    startup_id: startups[i].id,
                                                                    step_id: stepNew.id,
                                                                },
                                                                transaction: t
                                                            });
                                                            if (!startup_step) {
                                                                stp_step.push({
                                                                    startup_id: startups[i].id,
                                                                    step_id: stepNew.id,
                                                                    tip_completed: 0,
                                                                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                                                    state: 'incompleto',
                                                                    date_initial: Date.now()
                                                                });
                                                            }
                                                        }
                                                        await models.challenge.bulkCreate(chlls, { transaction: t }).catch(err => { console.log(err) });
                                                        await models.startup_step.bulkCreate(stp_step, { transaction: t }).catch(err => { console.log(err) });
                                                    } else if (result[x].tipo == "employee") {
                                                        var employees = await models.employee.findAll({
                                                            attributes: ['id', 'user_id'],
                                                        });
                                                        var chlls = [];
                                                        var emp_step = [];
                                                        for (var i = 0; i < employees.length; i++) {
                                                            chlls.push({
                                                                user_id: employees[i].user_id,
                                                                employee_id: employees[i].id,
                                                                stage_id: stageNew[0].dataValues.id,
                                                                step_id: stepNew.id,
                                                                tip_id: tipNew.dataValues.id,
                                                                checked: false,
                                                                status: "Sin respuesta",
                                                                date: Date.now(),
                                                                date_max: moment(Date.now()).add(result[x].duracion_dias, 'd').toDate()
                                                            });
                                                            var employee_step = await models.employee_step.findOne({
                                                                attributes: ['employee_id'],
                                                                where: {
                                                                    employee_id: employees[i].id,
                                                                    step_id: stepNew.id
                                                                },
                                                                transaction: t
                                                            });
                                                            if (!employee_step) {
                                                                emp_step.push({
                                                                    employee_id: employees[i].id,
                                                                    step_id: stepNew.id,
                                                                    tip_completed: 0,
                                                                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                                                    state: 'incompleto',
                                                                    date_initial: Date.now()
                                                                });
                                                            }
                                                        }
                                                        await models.challenge.bulkCreate(chlls, { transaction: t }).catch(err => { console.log(err) });
                                                        await models.employee_step.bulkCreate(emp_step, { transaction: t }).catch(err => { console.log(err) });
                                                    } else {
                                                        return res.json({ status: false, message: "El nivel pertenece a una estapa que no especifico el usuario al que pertenece el reto." });
                                                    }
                                                }
                                            }
                                            tipNew = await models.tip.findOne({
                                                where: {
                                                    step_id: stepNew.id,
                                                },
                                                transaction: t
                                            })
                                            var cadena = result[x].habilidades;
                                            var skills = cadena.split(/(?:,| )+/);
                                            if (skills) {
                                                var skills_id = await Promise.all(skills.map(async (element) => {
                                                    var [response, created] = await models.skill.findOrCreate({
                                                        where: { skill: { [models.Sequelize.Op.like]: '%' + element + '%' } },
                                                        defaults: {
                                                            skill: element
                                                        }
                                                    });
                                                    return await response.id;
                                                }), { transaction: t });
                                                await tipNew.addSkill(skills_id, { transaction: t });
                                            }
                                            var cadena_two = result[x].rubros;
                                            var categories = cadena_two.split(/(?:,| )+/);
                                            if (categories) {
                                                var categories_id = await Promise.all(categories.map(async (element) => {
                                                    var [response, created] = await models.category.findOrCreate({
                                                        where: { name: { [models.Sequelize.Op.like]: '%' + element + '%' } },
                                                        defaults: {
                                                            name: element
                                                        }
                                                    });
                                                    return await response.id;
                                                }), { transaction: t });
                                                await tipNew.addCategory(categories_id, { transaction: t });
                                            }
                                        });
                                    }
                                    else {
                                        return res.json({ status: false, message: "Valide que su archivo no tenga celdas vacias" });
                                    }
                                }
                                res.json({ status: true, message: "Se crearon correctamente los retos " + messageAlert, data: result });
                            });
                        });
                        fs.unlinkSync(`./uploads/${fileName}`)
                    } catch (e) {
                        console.log(e)
                        res.json({ status: false, message: "Archivo corrupto" });
                    }
                }
            });
        } else {
            return res.json({ status: false, message: messageFileInvalid })
        }
    },

    showAlertTip: async (req, res) => {
        const { user_id, type } = req.query
        const challenges = await models.challenge.findAll({
            attributes: ['date_max'],
            include: [
                {
                    model: models.startup,
                    attributes: ['name'],
                    required: false
                },
                {
                    model: models.tip,
                    attributes: ['tip'],
                    required: false
                }
            ],
            where: {
                user_id: user_id,
                status: 'Sin respuesta',
                viewed: 1,
                date_max: {
                    [models.Sequelize.Op.lte]: moment(Date.now()).add(3, 'd').toDate()
                }
            }
        })
        if (challenges) {
            console.log(moment(Date.now()).toDate())
            return res.json({ status: true, message: "Retos próximos a completar", data: challenges })
        } else {
            return res.json({ status: false, message: "No hay retos próximos a completar" })
        }
    },

    viewedChallenge: async (req, res) => {
        const { challenge_id } = req.query
        await models.challenge.update({
            viewed: 1
        }, { where: { id: challenge_id } }).then(chll => {
            res.json({ status: true, message: "Reto visto", data: chll })
        }).catch(err => {
            console.log(err)
            res.json({ status: false, message: "Lo sentimos, vuelva a intentarlo." })
        })
    }
}