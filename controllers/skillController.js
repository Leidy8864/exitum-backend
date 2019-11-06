const models = require('../models/index');
const { existById } = require('./elementController');
const Sequelize = require('sequelize');
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
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
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
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }

        try {

            const { user_id, skills } = req.body

            const user = await existById(models.user, user_id)
            const user_skill = await user.getToUserSkills()

            var skills_id = await Promise.all(skills.map(async element => {
                var [response, created] = await models.skill.findOrCreate({
                    where: { skill: element },
                    defaults: {
                        skill: element
                    }
                })
                return await response.id
            }
            ))

            await user.addToUserSkills(skills_id)
            
            if (user_skill.length <= 0) {
                await models.skill_user.update(
                    { highlight: 1 },
                    { where: {
                        [Sequelize.Op.and]: [
                            { user_id: user.id },
                            { skill_id: skills_id[0] },
                        ]
                    }
                })
            }
            


            return res.status(200).json({ status: true, message: "Skill creado correctamente", data: user_skill.da });

        } catch (error) {
            res.status(200).json({ status: false, message: (error.message) ? error.message : error });
        }
    },

    listById: async (req, res) => {

        try {

            const { user_id } = req.params
            const user = await existById(models.user, user_id)

            var skills = await user.getToUserSkills()

            return res.status(200).json({ status: true, message: "Skill creado correctamente", data: skills });

        } catch (error) {
            res.status(200).json({ status: false, message: (error.message) ? error.message : error });
        }

    },

    delete: async (req, res) => {

        try {

            const { user_id, skill_id } = req.body

            var skill_user = await models.skill_user.findOne({
                where: {
                    [Sequelize.Op.and]: [
                        { user_id: user_id },
                        { skill_id: skill_id }
                    ]
                }
            })

            if (skill_user == null || skill_user === undefined) {
                throw ('Ooop! No se encontraron los registrados.')
            }


            await models.skill_user.destroy({
                where: {
                    [Sequelize.Op.and]: [
                        { user_id: user_id },
                        { skill_id: skill_id }
                    ]
                }
            })

            return res.status(200).json({ status: true, message: "Skill borrado correctamente", data: {} });

        } catch (error) {
            res.status(200).json({ status: false, message: (error.message) ? error.message : error, data: {} });
        }

    },

    highlight: async (user, skill_id) => {

        var data = await user.getToUserSkills();

        if (data.length > 0) {

            const highlight = await models.skill_user.findOne({ 
                where: { [Sequelize.Op.and]: [
                    { user_id: user.id },
                    { highlight: 1 }
                ]}
             })
    
            if(highlight.skill_id != skill_id && skill_id != null && highlight != null) {
                await highlight.update({ highlight: 0 })
                await models.skill_user.update(
                    { highlight: 1 },
                    { where: {
                        [Sequelize.Op.and]: [
                            { user_id: user.id },
                            { skill_id: skill_id },
                        ]
                    }
                })
            }
            
        }
        
    }
}