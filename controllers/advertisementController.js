
const models = require('../models/index');

const { check, validationResult } = require('express-validator');

module.exports = {
    //Función encargada de validar los campos que se reciben desde el FrontEnd
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_string = "Este campo deber ser un string";
        var message_numeric = "Este campo debe ser numèrico";
        switch (method) {

            case 'create':

                return [
                    check('title').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('description').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('area_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                    check('startup_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                ]
            case 'update':

                return [
                    check('advertisement_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                ]
        }
    },

    createAdvert: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }
        try {
            const result = await models.sequelize.transaction(async (t) => {

                const advertisement = await models.advertisement.create({
                    title: req.body.title,
                    description: req.body.description,
                    state: 'active',
                    area_id: req.body.area_id,
                    startup_id: req.body.startup_id,
                    created_at: Date.now()
                }, { transaction: t });

                const { skills } = req.body
                var skills_id = await Promise.all(skills.map(async element => {
                    var [response, created] = await models.skill.findOrCreate({
                        where: { skill: { [models.Sequelize.Op.like]: '%' + element + '%' } },
                        defaults: {
                            skill: element
                        }
                    })
                    return await response.id
                }
                ))
                await advertisement.addSkill(skills_id, { transaction: t });
                return advertisement;
            });

            return res.status(200).json({ status: true, message: "Anuncio creado correctamente", data: result });
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "Error al crear anuncio" });
        }
    },

    updateAdvert: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }
        const advertisement_id = req.body.advertisement_id;

        try {
            const advertisement = await models.advertisement.findByPk(advertisement_id);

            if (advertisement) {

                await advertisement.update({
                    title: req.body.title,
                    description: req.body.description,
                    state: req.body.state,
                    area_id: req.body.area_id,
                    startup_id: req.body.startup_id
                });

                return res.status(200).json({ status: true, message: "Anuncio actualizado correctamente", data: advertisement });

            } else {

                return res.status(200).json({ status: false, message: "No existe el anuncio" })

            }

        } catch (error) {
            console.log("Error" + error);

            return res.status(200).json(
                {
                    status: false,
                    message: "Error al actualizar información del empleado",
                });
        }
    },
    updateSkills: async (req, res) => {

        const advertisement_id = req.body.advertisement_id;

        const skills = req.body.skills;

        try {
            await models.advertisement_skill.destroy({ where: { advertisement_id: advertisement_id } });


            const advertisement = await models.advertisement.findByPk(advertisement_id);

            if (advertisement) {
                advertisement.addSkill(skills);
            } else {
                return res.status(200).json({ status: false, message: "No se encontró el anuncio" });
            }

            return res.status(200).json({ status: true, message: "Skills actualizados correctamente" });

        } catch (error) {
            console.log("Error" + error);

            return res.status(200).json(
                {
                    status: false,
                    message: "Error al actualizar skills del anuncio"
                });
        }
    },

    findAllAdvertActive: async (req, res) => {
        try {


            const page = parseInt(req.query.page);
            const pageSize = parseInt(req.query.pageSize);

            const offset = page * pageSize;

            const limit = offset + pageSize;

            console.log("LIMIT", limit);
            const advertisements = await models.advertisement.findAll({
                limit: limit,
                offset: offset,
                where: { state: 'active' },

                include: [{
                    model: models.skill
                },
                {
                    model: models.area
                },
                {
                    model: models.startup
                }
                ]
            });

            return res.status(200).json({ status: true, message: "OK", data: advertisements });

        } catch (error) {

            console.log("Error" + error);
            return res.status(200).json(
                {
                    status: false,
                    message: "Error al listar los anuncios"
                });
        }
    },

    AdvertDetail: async (req, res) => {

        const advertisement_id = req.params.advertisement_id;

        try {

            const advertisements = await models.advertisement.findByPk(advertisement_id, {
                include: [{
                    model: models.skill
                },
                {
                    model: models.area
                },
                {
                    model: models.startup
                }
                ]
            });

            return res.status(200).json({ status: true, message: "OK", data: advertisements });

        } catch (error) {
            console.log("Error" + error);

            return res.status(200).json(
                {
                    status: false,
                    message: "Error al listar la informaciòn del anuncio"
                });
        }
    },

    findAdvertByEntrepreneur: async (req, res) => {
        const user_id = req.query.user_id;
        let perPage = 20;
        let page = req.query.page || 1;

        try {

            var entrepreneur = await models.entrepreneur.findOne({ where: { user_id: user_id } });
            console.log(entrepreneur.id)
            const whereConsult = {
                state: req.query.state,
                '$startup.entrepreneur.id$': entrepreneur.id
            };

            if (entrepreneur) {
                models.advertisement.findAll(
                    {
                        offset: (perPage * (page - 1)),
                        limit: perPage,
                        where: whereConsult,
                        include: [
                            {
                                model: models.startup,
                                include: [{
                                    model: models.entrepreneur,
                                }]
                            },
                            // {
                            //     model: models.proposal
                            // }
                        ]
                    }
                ).then(advertisements => {
                    models.advertisement.count({
                        where: whereConsult,
                        include: [
                            {
                                model: models.startup,
                                include: [
                                    {
                                        model: models.entrepreneur
                                    }
                                ],
                            }
                        ]
                    }).then(totalRows => {
                        return res.status(200).json({
                            status: true, message: "OK",
                            data: advertisements,
                            current: page,
                            pages: Math.ceil(totalRows / perPage)
                        });
                    })
                }).catch(err => {
                    console.log(err)
                });
            } else {
                return res.status(200).json({ status: false, message: "No se encontro al emprendedor" });
            }
        } catch (err) {
            console.log(err);
            return res.status(200).json({ status: false, message: "Error al listar anuncios" });
        }
    },

    advertsBySkill: async (req, res) => {
        let user_id = req.query.user_id
        let perPage = 20;
        let page = req.query.page || 1;

        const user = await models.user.findOne({
            attributes: ['id'],
            where: { id: user_id },
            include: [
                {
                    model: models.skill,
                    as: "toUserSkills",
                    attributes: ['id', 'skill']
                }
            ]
        })
        var skill_user = []
        for (var i = 0; i < user.toUserSkills.length; i++) {
            skill_user.push(user.toUserSkills[i].skill)
        }
        const employee = await models.employee.findOne({ where: { user_id: user_id } });
        console.log(employee.id)
        var prop_ads_id = []
        const proposal = await models.proposal.findAll();
        for (var i = 0; i < proposal.length; i++) {
            prop_ads_id.push(proposal[i].advertisement_id)
        }
        await models.advertisement.findAll({
            offset: (perPage * (page - 1)),
            limit: perPage,
            where: {
                state: 'active',
                id: { [models.Sequelize.Op.notIn]: prop_ads_id }
                //'$proposals.employee_id$': { [models.Sequelize.Op.notIn]: [employee.id] }
            },
            include: [
                {
                    model: models.skill,
                    where: {
                        skill: { [models.Sequelize.Op.or]: [skill_user] }
                    }
                },
                {
                    model: models.startup,
                    include: [{
                        model: models.entrepreneur,
                    }]
                },
                {
                    model: models.area
                }
            ]
        }).then(ads => {
            models.advertisement.count({
                where: {
                    state: 'active',
                    id: { [models.Sequelize.Op.notIn]: prop_ads_id }
                },
                include: [
                    {
                        model: models.skill,
                        where: {
                            skill: { [models.Sequelize.Op.or]: [skill_user] }
                        }
                    },
                    {
                        model: models.startup,
                        include: [{
                            model: models.entrepreneur,
                        }]
                    }
                ]
            }).then(totalRows => {
                return res.json({ status: true, message: "Listado de anuncios por skill", data: ads, current: page, pages: Math.ceil(totalRows / perPage) })
            })
        })
    },

    advertsByProposal: async (req, res) => {
        let user_id = req.query.user_id
        let perPage = 20;
        let page = req.query.page || 1;

        const employee = await models.employee.findOne({ attributes: ['id'], where: { user_id: user_id } });
        const proposal = await models.proposal.findAll({
            attributes: ['advertisement_id'],
            where: { employee_id: employee.id },
        })
        var ads_ids = []
        for (var i = 0; i < proposal.length; i++) {
            ads_ids.push(proposal[i].advertisement_id)
        }
        await models.advertisement.findAll({
            offset: (perPage * (page - 1)),
            limit: perPage,
            where: {
                // state: 'active',
                id: { [models.Sequelize.Op.or]: [ads_ids] }
            },
            include: [
                {
                    model: models.skill
                },
                {
                    model: models.area
                },
                {
                    model: models.startup,
                    include: [{
                        model: models.entrepreneur,
                    }]
                }
            ]
        }).then(ads => {
            models.advertisement.count({
                where: {
                    //state: 'active',
                    id: { [models.Sequelize.Op.or]: [ads_ids] }
                },
                include: [
                    {
                        model: models.startup,
                        include: [{
                            model: models.entrepreneur,
                        }]
                    }
                ]
            }).then(totalRows => {
                return res.json({ status: true, message: "Listado de anuncios por postulación", data: ads, current: page, pages: Math.ceil(totalRows / perPage) })
            })
        })
    }

}