const models = require('../models/index');
const { existById } = require('./elementController');
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
            return res.json({ status: true, message: "OK", data: skills });

        } catch (error) {
            res.json({ status: false, message: (error.message) ? error.message : error });
        }
    },

    createSkill: async (req, res) => {

        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({ status : false , message : "Campos incorrectos",data: errors.array() });
        }

        const { skill } = req.body

        try {

            await models.skill.create({ skill: skill })
            return res.status(200).json({ status: true, message: "Skill creado correctamente", data: skill });

        } catch (error) { 
            res.status(200).json({ status: false, message: "Error al crear el skill" });
         }

    },

    userAddSkill: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status : false, message : "Campos incorrectos", data: errors.array() });
        }

        try {

            const { user_id, skills } = req.body

            const user = existById(models.user, user_id)

            // var skills_id = await skills.map( element => {

            //     var [response, created ] = models.skill.findOrCreate({
            //         where: { skill:  { [Sequelize.Op.like]  : '%' + element + '%'} } ,
            //         defaults: { skill: element }
            //     })

            //     return response.id

            // })

            // return res.status(200).json({ status: true, message: "Skill creado correctamente", data: skills_id });

        } catch (error) {
            res.status(200).json({ status: false, message: (error.message) ? error.message : error });
        }

    }
}