const text = require('../libs/text');
const index = require('../config/index');
const models = require('../models/index');
const { putObject } = require('../libs/aws-s3');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const s3 = require('../libs/aws-s3');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/step-icons';

module.exports = {

    validate: (method) => {

        const step = check('step').exists()
        const step_id = check('step_id').exists()

        switch (method) {
            case 'create':
                return [step]
            case 'update':
                return [step_id]
            case 'delete':
                return [step_id]
        }

    },
    all: async (req, res) => {

        try {
            const step = await models.step.findAll({});
            return successful(res, 'OK', step)

        } catch (error) { return returnError(res, error) }

    },

    listByStage: async (req, res) => {
        try {
            const { stage_id } = req.query
            const step = await models.step.findAll({
                where: {
                    stage_id: stage_id
                }
            });
            return successful(res, 'OK', step)

        } catch (error) { return returnError(res, error) }
    },

    create: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { step, stage_id } = req.body
        var fileName = null

        try {
            if (req.files) {
                const { icon } = req.files
                fileName = putObject(NEW_BUCKET_NAME, icon);
            } else {
                return res.json({ status: false, message: "Es necesario subir un icono" })
            }
            await models.sequelize.transaction(async (t) => {
                var stageFind = await models.stage.findOne({
                    where: {
                        id: stage_id
                    },
                    attributes: ['id', 'type']
                })

                var stepNew = await models.step.create({
                    step: step,
                    icon: fileName,
                    stage_id: stage_id
                }, { transaction: t })

                for (var x = 1; x <= 4; x++) {
                    var tipNew = await models.tip.create({
                        tip: "Reto número " + x,
                        step_id: stepNew.id
                    }, { transaction: t })
                    if (stageFind.type == "startup") {
                        var startups = await models.startup.findAll({
                            attributes: ['id'],
                            include: [
                                { model: models.entrepreneur }
                            ]
                        });
                        var chlls = [];
                        var stp_step = [];
                        for (var i = 0; i < startups.length; i++) {
                            chlls.push({
                                user_id: startups[i].entrepreneur.user_id,
                                startup_id: startups[i].id,
                                stage_id: stageFind.id,
                                step_id: stepNew.id,
                                tip_id: tipNew.id,
                                checked: false,
                                status: "Sin respuesta",
                                date: Date.now()
                            });
                            var startup_step = await models.startup_step.findOne({
                                where: {
                                    startup_id: startups[i].id,
                                    step_id: stepNew.id,
                                }
                            });
                            if (!startup_step) {
                                stp_step.push({
                                    startup_id: startups[i].id,
                                    step_id: stepNew.id,
                                    tip_completed: 0,
                                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                    state: 'incompleto'
                                });
                            }
                        }
                        await models.challenge.bulkCreate(chlls, { transaction: t });
                        await models.startup_step.bulkCreate(stp_step, { transaction: t });
                    } else if (stageFind.type == "employee") {
                        var employees = await models.employee.findAll({
                            attributes: ['id', 'user_id'],
                        });
                        var chlls = [];
                        var emp_step = [];
                        for (var i = 0; i < employees.length; i++) {
                            chlls.push({
                                user_id: employees[i].user_id,
                                employee_id: employees[i].id,
                                stage_id: stageFind.id,
                                step_id: stepNew.id,
                                tip_id: tipNew.id,
                                checked: false,
                                status: "Sin respuesta",
                                date: Date.now()
                            });
                            var employee_step = await models.employee_step.findOne({
                                where: {
                                    employee_id: employees[i].id,
                                    step_id: stepNew.id
                                }
                            });
                            if (!employee_step) {
                                emp_step.push({
                                    employee_id: employees[i].id,
                                    step_id: stepNew.id,
                                    tip_completed: 0,
                                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                    state: 'incompleto'
                                });
                            }
                        }
                        console.log(chlls)
                        await models.challenge.bulkCreate(chlls, { transaction: t });
                        await models.employee_step.bulkCreate(emp_step, { transaction: t });
                    } else {
                        return res.json({ status: false, message: "El nivel pertenece a una estapa que no especifico el usuario al que pertenece el reto." });
                    }
                }
                return successful(res, text.successCreate('step'))
            })
        } catch (error) { 
            console.log(error)
            return returnError(res, error) 
        }

    },

    update: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { step, step_id } = req.body

        try {
            var step_data = await existById(models.step, step_id)
            var fileName = step_data.icon
            if (req.files) {
                console.log(step_data.icon)
                if (step_data.icon) s3.deleteObject(NEW_BUCKET_NAME, (step_data.icon).split('/')[5])

                const { icon } = req.files
                fileName = putObject(NEW_BUCKET_NAME, icon);
            }

            step_data.update({
                step: step,
                icon: fileName
            })

            return successful(res, text.successUpdate('step'))

        } catch (error) { 
            console.log(error)
            return returnError(res, error) 
        }

    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { step_id } = req.query
        var tips_id = []
        var chlls_id = []
        try {
            const tips = await models.tip.findAll({
                where: {
                    step_id: step_id
                },
                attributes: ['id']
            })

            for (var x = 0; x < tips.length; x++) {
                tips_id.push(tips[x].id)
            }
            await models.tip_category.destroy({
                where: {
                    tip_id: tips_id
                }
            })
            await models.tip_skill.destroy({
                where: {
                    tip_id: tips_id
                }
            })
            const chlls = await models.challenge.findAll({
                where: {
                    step_id: step_id
                },
                attributes: ['id']
            })
            for (var x = 0; x < chlls.length; x++) {
                chlls_id.push(chlls[x].id)
            }
            console.log("hasta aca")
            await models.file.destroy({
                where: {
                    id: chlls_id    
                }
            })
            await models.challenge.destroy({
                where: {
                    step_id: step_id
                }
            })
            await models.employee_step.destroy({
                where: {
                    step_id: step_id
                }
            })
            await models.startup_step.destroy({
                where: {
                    step_id: step_id
                }
            })
            await models.file_tip.destroy({
                where: {
                    id: tips_id    
                }
            })
            await models.tip.destroy({
                where: {
                    id: tips_id
                }
            })
            const step = await models.step.destroy({
                where: {
                    id: step_id
                }
            })
            return successful(res, text.successDelete('step'), step)

        } catch (error) {
            console.log(error)
            return returnError(res, error)
        }

    }
}