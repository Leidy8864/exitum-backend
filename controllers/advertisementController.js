
const models = require('../models/index');

const { check, validationResult } = require('express-validator');

module.exports = {

    createAdvert: async (req, res) => {

        try {
            const result = await models.sequelize.transaction(async (t) => {

                const advertisement = await models.advertisement.create({
                    title: req.body.title,
                    description: req.body.description,
                    state: 'active',
                    category_id: req.body.category_id,
                    startup_id: req.body.startup_id,
                    created_at : Date.now()

                }, { transaction: t });

                await advertisement.addSkill(req.body.skills, { transaction: t });

                return advertisement;
            });

            return res.status(200).json({ advertisement: result, message: "Anuncio creado correctamente" });
        } catch (error) {

            res.status(500).json({
                message: "Error al crear anuncio"
            });
        }
    },
    updateAdvert: async (req, res) => {

        const advertisement_id = req.body.advertisement_id;

        try {
            const advertisement = await models.advertisement.findByPk(advertisement_id);
            if (employee) {

                await advertisement.update({
                    title: req.body.title,
                    description: req.body.description,
                    state: req.body.state,
                    category_id: req.body.category_id,
                    startup_id: req.body.startup_id
                });

                return res.status(200).json({ status: 200, message: "Anuncio actualizado correctamente" });
            } else {

                return res.status(400).send({ status: 400, message: "No existe el anuncio" })

            }

        } catch (error) {
            return res.status(500).json(
                {
                    message: "Error al actualizar información del empleado",
                });
        }
    },
    updateSkills: async (req, res) => {

        const advertisement_id = req.body.advertisement_id;

        const skills = req.body.skills;

        try {
            await models.advertisement_skill.destroy({ where: { advertisement_id: advertisement_id } });

            const advertisement = await models.employee.findByPk(advertisement_id);

            advertisement.addSkill(skills);

            return res.status(200).json({ status: 200, message: "Skills actualizados correctamente" });

        } catch (error) {
            return res.status(500).json(
                {
                    message: "Error al actualizar información del empleado",
                });
        }
    },

    findAllAdvertActive: async (res) => {

        try {

            const advertisements = await models.advertisement.finAll({
                limit: 15,
                where: { active: true },

                include: [{
                    model: models.skill
                },
                {
                    model: models.category
                },
                {
                    model: models.startup
                }
                ]
            });

            return res.status(200).json({ advertisements: advertisements });

        } catch (error) {

            return res.status(500).json(
                {
                    message: "Error al listar anuncios activos",
                });
        }
    },
    AdvertDetail : async (req,res) => {

        const advertisement_id = req.params.advertisement_id;

        try {

            const advertisements = await models.advertisement.findOne(advertisement_id,{
                limit: 15,
                include: [{
                    model: models.skill
                },
                {
                    model: models.category
                },
                {
                    model: models.startup
                }
                ]
            });

            return res.status(200).json({ advertisements: advertisements });

        } catch (error) {

            return res.status(500).json(
                {
                    message: "Error al listar anuncios activos",
                });
        }
    },
    findAdvertByEntrepreneur: async (req, res) => {

        const user_id = req.params.user_id;

        try {

            const entrepreneur = await models.entrepreneur.finOne({ where: { user_id: user_id } });

            const advertisements = await models.advertisement.finAll({
                limit: 15,
                where: { state: req.body.state },
                include: [{
                    model: models.skill
                },
                {
                    model: models.category
                },
                {
                    model: models.startup,
                    include: [{
                        model: models.entrepreneur,
                        where: {
                            id: entrepreneur.id
                        }
                    }],
                }
                ]
            });

            return res.status(200).json({ advertisements: advertisements });

        } catch (error) {

            return res.status(500).json(
                {
                    message: "Error al listar anuncios activos",
                });
        }

    },

    findEntreprenur: async (user_id) => {
        try {
            const entrepreneur = await models.entrepreneur.finOne({ where: { user_id: user_id } });

            res.status(200).json({ entrepreneur });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error al encontrar empleado");
        }
    }

}