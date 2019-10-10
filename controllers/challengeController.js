const models = require('../models/index');
const index = require('../config/index');
const s3 = require('../libs/aws-s3');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/step-icons';

const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        switch (method) {
            case 'create':
                return [
                    check('type', message_exists).exists().isIn(['employee', 'startup']),
                    check('stage', message_exists).exists(),
                    check('description', message_exists).exists()
                ]
        }
    },

    createChallenge: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Campos incorrectos, por favor intentelo nuevamente.", data: errors.array() });
        }


        models.stage.findOne({ where: { stage: req.body.stage } }).then(stage => {
            if (stage) {
                res.json({ status: false, message: "El nombre de este stage ya existe" });
            } else {
                try {
                    models.sequelize.transaction(async (t) => {
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
                } catch (error) {
                    res.status(200).json({ status: false, message: "Error al crear un reto" });
                }
            }
        })

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
            return res.status(200).send({ status: false, message: "Campos incorrectas, por favor intentelo nuevamente.", data: errors.array() });
        }

        try {
            models.entrepreneur.findOne({ where: { user_id: req.body.id } }).then(entrepreneur => {
                if (entrepreneur) {
                    models.startup.findOne({ where: { entrepreneur_id: entrepreneur.id } }).then(startup => {
                        if (startup) {
                            startup.addTip(req.body.tip_id, { through: { checked: req.body.checked } }).then(checked => {
                                if (checked) {
                                    return res.json({ status: 200, message: 'Reto superado correctamente.', data: { checked } })
                                } else {
                                    return res.json({ status: false, message: 'Reto superado sin guardar.' })
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

    rating: (req, res) => {
        var errors = validationResult(req)

        const { rating, from_user_id } = req.body
        const { to_user_id } = req.params

        if (!errors.isEmpty()) {
            return res.status(422).send({ status: false, message: "Data incorrecta, por favor intentelo nuevamente.", data: errors.array() });
        }

        models.user.findOne({ where: { id: to_user_id } })
            .then(user => {

                user.addFromUser(from_user_id, { through: { rating: rating, created_at: Date.now() } })
                    .then(rating => {
                        return res.status(200).json({ status: true, message: 'Rating asignado correctamente.', data: { rating } })
                    }).catch(err => {
                        return res.status(500).json({ status: false, message: err.message, data: {} })
                    });

            })
            .catch(err => {
                return res.status(500).json(err)
            })

    },
}