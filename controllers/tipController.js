const text = require('../libs/text');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const index = require('../config/index');
const FILES_TIP_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/documentos/files_tip';
const { getObject, putObject, getDownloadUrl, deleteObject } = require('../libs/aws-s3');

module.exports = {

    validate: (method) => {

        const tip = check('tip').exists().withMessage(text.tip)
        const tip_id = check('tip_id').exists().withMessage(text.id('tip'))
        const description = check('title').exists().withMessage(text.description)
        const step_id = check('place').exists().withMessage(text.id('step'))

        switch (method) {
            case 'create':
                return [tip, description, step_id]
            case 'update':
                return [tip_id]
            case 'delete':
                return [tip_id]
            case 'deleteFile':
                return [
                    check('key_s3').exists()
                ]
        }
    },

    all: async (req, res) => {

        const perPage = 20;
        let page = req.query.page || 1;

        try {
            const number_tips = await models.tip.count()

            const tip = await models.tip.findAll({
                offset: (perPage * (page - 1)),
                limit: perPage,
                include: [
                    { model: models.step }
                ]
            });

            return res.status(200).json({ status: true, message: 'OK', data: tip, current: page, pages: Math.ceil(number_tips / perPage) })

        } catch (error) { return returnError(res, error) }

    },

    listByStep: async (req, res) => {
        const { step_id } = req.query
        let perPage = 15;
        let page = req.query.page || 1;

        if (step_id) {
            const tips = await models.tip.findAll({
                offset: (perPage * (page - 1)),
                limit: perPage,
                where: {
                    step_id: step_id
                },
                include: [
                    {
                        model: models.step,
                        required: false
                    },
                    {
                        model: models.file_tip,
                        required: false
                    },
                    {
                        model: models.tip_skill,
                        required: false,
                        include: [
                            { model: models.skill }
                        ]
                    },
                    {
                        model: models.tip_category,
                        required: false,
                        include: [
                            { model: models.category }
                        ]
                    }
                ]

            })
            const totalRows = await models.tip.count({
                where: {
                    step_id: step_id
                }
            })
            return res.json({ status: true, message: "Listado de retos por nivel", data: tips, current: page, pages: Math.ceil(totalRows / perPage) })
        } else {
            const tips = await models.tip.findAll({
                offset: (perPage * (page - 1)),
                limit: perPage,
                include: [
                    {
                        model: models.step,
                        required: false
                    },
                    {
                        model: models.file_tip,
                        required: false
                    },
                    {
                        model: models.tip_skill,
                        required: false,
                        include: [
                            { model: models.skill }
                        ]
                    },
                    {
                        model: models.tip_category,
                        required: false,
                        include: [
                            { model: models.category }
                        ]
                    }
                ]
            })
            const totalRows = await models.tip.count()
            return res.json({ status: true, message: "Listado de retos por nivel", data: tips, current: page, pages: Math.ceil(totalRows / perPage) })
        }

    },

    create: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { tip, description, step_id } = req.body

        try {
            await models.tip.create({
                tip: tip,
                description: description,
                step_id: step_id
            })

            return successful(res, text.successCreate('tip'))

        } catch (error) { return eturnError(res, error) }

    },

    update: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { tip_id, tip, description, type } = req.body
        //type : { "evaluación automatizada", "evaluado por la comunidad" }
        var name = null
        var file = null
        try {
            await models.sequelize.transaction(async (t) => {
                var tipNew = await existById(models.tip, tip_id)

                tipNew.update({
                    tip: tip,
                    description: description,
                    type: type
                }, { transaction: t })

                const stepFind = await models.step.findOne({
                    where: { id: tipNew.step_id },
                    attributes: ['id'],
                    include: [{
                        model: models.stage,
                        attributes: ['id', 'type']
                    }]
                })
                if (req.files) {
                    for (var x = 0; x < req.files.file.length; x++) {
                        file = req.files.file[x];
                        fileName = putObject(FILES_TIP_BUCKET_NAME, file);
                        name = file.name
                        await models.file_tip.create({
                            name: name,
                            key_s3: (fileName).split('/')[5],
                            tip_id: tipNew.id
                        }, { transaction: t });
                    }   
                }

                const typeUser = stepFind.stage.type

                if (typeUser == "startup") {
                    const startups = await models.startup.findAll({
                        attributes: ['id'],
                        include: [
                            { model: models.entrepreneur }
                        ]
                    })
                    var chlls = []
                    var stp_step = []
                    var challenges = null
                    for (var i = 0; i < startups.length; i++) {
                        challenges = await models.challenge.findAll({
                            where: {
                                user_id: startups[i].entrepreneur.user_id,
                                startup_id: startups[i].id,
                                stage_id: stepFind.stage.id,
                                step_id: stepFind.id,
                                tip_id: tipNew.id
                            }
                        })
                        chlls.push({
                            user_id: startups[i].entrepreneur.user_id,
                            startup_id: startups[i].id,
                            stage_id: stepFind.stage.id,
                            step_id: stepFind.id,
                            tip_id: tipNew.id,
                            checked: false,
                            status: "Sin respuesta",
                            date: Date.now()
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
                    if (!challenges) {
                        await models.challenge.bulkCreate(chlls, { transaction: t });
                        await models.startup_step.bulkCreate(stp_step, { transaction: t });
                    }
                } else if (typeUser == "employee") {
                    const employees = await models.employee.findAll({
                        attributes: ['id', 'user_id'],
                    })
                    var chlls = []
                    var emp_step = []
                    for (var i = 0; i < employees.length; i++) {
                        challenges = await models.challenge.findAll({
                            where: {
                                user_id: employees[i].user_id,
                                employee_id: employees[i].id,
                                stage_id: stepFind.stage.id,
                                step_id: stepFind.id,
                                tip_id: tipNew.id
                            }
                        })
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
                    if (!challenges) {
                        await models.challenge.bulkCreate(chlls, { transaction: t });
                        await models.employee_step.bulkCreate(emp_step, { transaction: t });
                    }
                } else {
                    return res.json({ status: false, message: "El nivel pertenece a una estapa que no especifico el usuario al que pertenece el reto." })
                }
            })
            return successful(res, text.successUpdate('tip'))

        } catch (error) { returnError(res, error) }

    },

    detail: async (req, res) => {
        const { tip_id } = req.query
        const tip = await models.tip.findOne({
            where: {
                id: tip_id
            },
            include: [
                {
                    model: models.file_tip,
                    required: false
                },
                {
                    model: models.tip_skill,
                    required: false,
                    include: [
                        { model: models.skill }
                    ]
                },
                {
                    model: models.tip_category,
                    required: false,
                    include: [
                        { model: models.category }
                    ]
                }
            ]
        })
        if (!tip) {
            return res.json({ status: false, message: "No exixte el reto" })
        }
        return res.json({ status: true, message: "Detalle del tip", data: tip })
    },

    deleteFileTip: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        try {
            const { key_s3 } = req.body

            var file = await models.file_tip.findOne({
                where: { key_s3: key_s3 }
            });

            if (!file) { return res.json({ status: false, message: "El nombre del archivo no exixte." }) }

            deleteObject(FILES_TIP_BUCKET_NAME, key_s3);

            await file.destroy()

            return successful(res, text.successDelete('archivo'))

        } catch (error) { return returnError(res, error) }
    },

    addSkills: async (req, res) => {
        const { skills, tip_id } = req.body
        await models.sequelize.transaction(async (t) => {
            var tip_data = await existById(models.tip, tip_id)
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
                await tip_data.addSkill(skills_id, { transaction: t });
                return res.json({ status: true, message: "Skills añadidos correctamente" })
            }
        })
    },

    addCategories: async (req, res) => {
        const { categories, tip_id } = req.body
        await models.sequelize.transaction(async (t) => {
            var tip_data = await existById(models.tip, tip_id)
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
                await tip_data.addCategory(categories_id, { transaction: t });
                return res.json({ status: true, message: "Categorias añadidas correctamente" })
            }
        })
    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { tip_id } = req.body

        try {
            var tip_data = await existById(models.tip, tip_id)
            await tip_data.destroy()

            return successful(res, text.successDelete('tip'))

        } catch (error) { return returnError(res, error) }

    }
}