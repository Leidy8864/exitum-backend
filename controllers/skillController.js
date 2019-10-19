const models = require('../models/index');
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        switch (method) {
            case 'create':

                return [
                    check('skill', message_exists).exists()
                ]
        }
    },
    findAllSkill: async (res) => {
        try {
            const skills = await models.skill.findAll();

            return res.json({ status: true, message: "OK",data: skills });

        } catch (error) {
            res.json({
                status: false,
                message: "Error al listar skills"
            });
        }
    },

    createSkill: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status : false , message : "Campos incorrectos",data: errors.array() });
        }

        try {

            const skill = models.skill.create({
                skill: req.body.skill
            }).then(skill => {
                return res.status(200).json({ status: true, message: "Skill creado correctamente", data: skill });
            });
        } catch (error) {

            res.status(200).json({
                status: false,
                message: "Error al crear el skill"
            });
        }
    },
}