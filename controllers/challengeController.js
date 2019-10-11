const models = require('../models/index');
const index = require('../config/index');
const s3 = require('../libs/aws-s3');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/user-profile';

const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        switch (method) {
            case 'create':
                return [
                    check('type', message_exists).exists().isIn(['employee', 'startup']),
                ]
        }
    },

    createChallenge: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }

        try {
            models.stage.findOne({ where: { stage: req.body.stage } }).then(stage => {
                if (stage) {
                    res.json({ status: false, message: "El nombre de este stage ya existe" });
                } else {
                    await models.sequelize.transaction(async (t) => {
                        const stage = await models.stage.create({
                            stage: req.body.stage,
                            description: req.body.description,
                            type: req.body.type
                        }, { transaction: t });
                        var fileName = '';
                        if (req.files) {
                            var photo = req.files.photo;
                            fileName = s3.putObject(NEW_BUCKET_NAME, photo);
                        }
                        const step = await models.step.create({
                            icon: fileName,
                            stage_id: stage.id
                        }, { transaction: t });

                        await models.tip.create({
                            tip: req.body.tip,
                            step_id: step.id
                        }, { transaction: t });
                        return res.json({ status: 200, message: "Reto creado correctamente." })
                    });
                }
            })
        } catch (error) {
            res.status(200).json({ status: false, message: "Error al crear un reto para el empleado" });
        }
    },

    checkChallengeEmployee: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }

        try {
            models.employee.findOne({ where: { user_id: req.body.id } }).then(employee => {
                if (employee) {
                    models.startup_tip.create({
                        tip_id: req.body.tip_id,
                        startup_id: req.body.startup_id,
                        checked: req.body.checked
                    }).then(checked => {
                        if (checked) {
                            return res.json({ status: 200, message: "Creado correctamente." })
                        } else {
                            return res.json({ status: false, message: "Error al crear" })
                        }
                    });
                } else {
                    return res.json({ status: false, message: "No existe el impulsor" })
                }
            })

        } catch (error) {
            res.status(200).json({ status: false, message: "Error al crear un reto para el empleado" });
        }
    },

    checkChallengeStartup: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Credenciales incorrectas, por favor intentelo nuevamente.", data: errors.array() });
        }

        try {
            models.entrepreneur.findOne({ where: { user_id: req.body.id } }).then(entrepreneur => {
                if (entrepreneur) {
                    models.startup_tip.create({
                        tip_id: req.body.tip_id,
                        startup_id: req.body.startup_id,
                        checked: req.body.checked
                    }).then(checked => {
                        if (checked) {
                            return res.json({ status: 200, message: "Creado correctamente." })
                        } else {
                            return res.json({ status: false, message: "Error al crear" })
                        }
                    });
                } else {
                    return res.json({ status: false, message: "No existe el impulsor" })
                }
            })

        } catch (error) {
            res.status(200).json({ status: false, message: "Error al crear un reto para el empleado" });
        }
    },


}