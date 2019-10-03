const models = require('../models/index');

module.exports = {

    findAllSkill: async (res) => {
        try {
            const skills = models.skill.findAll();

            return res.status(200).json({ status: 200, message: "ok", data: { skill: skills } });

        } catch (error) {
            res.status(500).json({
                message: "Error al listar skills"
            });
        }
    },

    createSkill: async (req, res) => {
        try {

            const skill = models.skill.create({
                skill: req.body.skill
            });

            return res.status(200).json({ status: 200, message: "Skill creado correctmente", data: { skill: skill } });
        } catch (error) {
            console.log(error);
            res.json({ status: false, message: "Error al crear el skill" });
        }
    }
}