
const models = require('../models/index');

const { check, validationResult } = require('express-validator');

function generateSlug(string) {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
    const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

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

            case 'invitation':

                return [
                    check('advertisement_id').exists().withMessage(message_exists).isInt().withMessage(message_numeric),
                    check('saved').exists().withMessage(message_exists)
                ]
        }
    },

    createAdvert: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }
        const ads = await models.advertisement.findOne({ where: { startup_id: req.body.startup_id, title: req.body.title } });
        if (ads) {
            return res.json({ status: false, message: "Este titulo ya lo usaste en otro anuncio." })
        } else {
            try {
                const result = await models.sequelize.transaction(async (t) => {
                    const advertisement = await models.advertisement.create({
                        title: req.body.title,
                        description: req.body.description,
                        state: 'active',
                        area_id: req.body.area_id,
                        startup_id: req.body.startup_id,
                        created_at: Date.now(),
                        slug: generateSlug(req.body.title)
                    }, { transaction: t });

                    const { skills } = req.body
                    if (skills) {
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
                    }
                    await advertisement.addSkill(skills_id, { transaction: t });
                    return advertisement;

                });
                return res.status(200).json({ status: true, message: "Anuncio creado correctamente", data: result });
            } catch (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Error al crear anuncio" });
            }
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
                if (skills) {
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
                }
                await advertisement.addSkill(skills_id);
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
                include: [
                    {
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
        let perPage = 6;
        let page = req.query.page || 1;

        try {

            var entrepreneur = await models.entrepreneur.findOne({ where: { user_id: user_id } });
            const whereConsult = {
                state: req.query.state,
                //'$startup.entrepreneur.id$': entrepreneur.id
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
                                    where: {
                                        id: entrepreneur.id
                                    }
                                }]
                            },
                            {
                                model: models.proposal
                            },
                            // {
                            //     model: models.advertisement_skill,
                            //     as: 'advertisement_skills',
                            //     include: [
                            //         {
                            //             model: models.skill,
                            //             as: 'skill',
                            //             include: [
                            //                 {
                            //                     model: models.user,
                            //                     as: 'toSkillUsers',
                            //                     attributes: ['id', 'name']
                            //                 }
                            //             ]
                            //         }
                            //     ],
                            //     group: ['advertisement_id']
                            // },
                        ]
                    }
                ).then(advertisements => {
                    models.advertisement.count({
                        distinct: true,
                        where: {
                            state: req.query.state,
                            '$startup.entrepreneur.id$': entrepreneur.id
                        },
                        include: [
                            {
                                model: models.startup,
                                include: [{
                                    model: models.entrepreneur,
                                    where: {
                                        id: entrepreneur.id
                                    }
                                }]
                            }
                        ]
                    }).then(totalRows => {
                        console.log(advertisements.length)
                        console.log(totalRows)
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
        let perPage = 6;
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
        if (!employee) { return res.json({ status: false, message: "No se ha registrado como empleado." }) }
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
                distinct: true,
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
        let perPage = 6;
        let page = req.query.page || 1;

        const employee = await models.employee.findOne({ attributes: ['id'], where: { user_id: user_id } });
        if (!employee) { return res.json({ status: false, message: "No se ha registrado como impulsor" }) }
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
                distinct: true,
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
    },

    usersRecomendation: async (req, res) => {
        const { advertisement_id } = req.query
        let perPage = 6;
        let page = req.query.page || 1;

        try {
            const ads = await models.advertisement_skill.findAll({
                where: { advertisement_id: advertisement_id },
                include: [
                    {
                        model: models.skill,
                        attributes: ['skill']
                    }
                ]
            });
            var skill_name = []
            for (var i = 0; i < ads.length; i++) {
                skill_name.push(ads[i].skill.skill)
            }
            const props = await models.proposal.findAll({
                where: { advertisement_id: advertisement_id }
            });
            var prop_emp_ids = []
            for (var i = 0; i < props.length; i++) {
                prop_emp_ids.push(props[i].employee_id)
            }
            const users = await models.user.findAll({
                offset: (perPage * (page - 1)),
                limit: perPage,
                attributes: ['id', 'name', 'lastname', 'photo', 'description', 'avg_rating'],
                include: [
                    {
                        model: models.skill,
                        as: "toUserSkills",
                        where: {
                            skill: { [models.Sequelize.Op.or]: skill_name }
                        }
                    },
                    {
                        model: models.employee,
                        where: {
                            id: { [models.Sequelize.Op.notIn]: prop_emp_ids }
                        },
                        include: [
                            {
                                model: models.invitation,
                                where: {
                                    advertisement_id: advertisement_id
                                },
                                required: false
                            }
                        ]
                    }
                ]
            });
            const totalRows = await models.user.count({
                distinct: true,
                include: [
                    {
                        model: models.skill,
                        as: "toUserSkills",
                        where: {
                            skill: { [models.Sequelize.Op.or]: skill_name }
                        },
                        required: true
                    },
                    {
                        model: models.employee,
                        where: {
                            id: { [models.Sequelize.Op.notIn]: prop_emp_ids }
                        },
                        required: true
                    }
                ]
            });
            return res.json({ status: true, message: "Lista de impulsores recomendados", data: users, current: page, pages: Math.ceil(totalRows / perPage) })
        } catch (err) {
            console.log(err)
            return res.json({ status: false, message: "Error al listar las propuestas" })
        }
    },

    usersFavorites: async (req, res) => {
        const { advertisement_id } = req.query
        let perPage = 6;
        let page = req.query.page || 1;

        const inv = await models.invitation.findAll({
            offset: (perPage * (page - 1)),
            limit: perPage,
            where: { 
                advertisement_id: advertisement_id,
                saved: 1 
            },
            include: [
                {
                    model: models.employee,
                    include: [
                        {
                            model: models.user,
                            attributes: ['id', 'name', 'lastname', 'photo', 'description', 'avg_rating'],
                        },
                        {
                            model: models.invitation,
                            where: {
                                advertisement_id: advertisement_id
                            },
                            required: false
                        }
                    ]
                }
            ]
        })
        const totalRows = await models.invitation.count({
            where: { 
                advertisement_id: advertisement_id,
                saved: 1 
            },
            include: [
                {
                    model: models.employee,
                    include: [
                        {
                            model: models.user,
                            attributes: ['id', 'name', 'lastname', 'photo', 'description', 'avg_rating'],
                        },
                        {
                            model: models.invitation,
                            where: {
                                advertisement_id: advertisement_id
                            },
                            required: false
                        }
                    ]
                }
            ]
        })
        return res.json({ status: true, message: "Lista de impulsores favoritos.", data: inv, current: page, pages: Math.ceil(totalRows / perPage) })

    },

    createInvitation: async (req, res) => {
        const { advertisement_id, user_id, saved } = req.body
        const advertisement = await models.advertisement.findOne({ where: { id: advertisement_id } })
        const employee = await models.employee.findOne({ where: { user_id: user_id } })
        if (!employee) { return res.json({ status: false, message: "El impulsor no existe." }) }
        if (!advertisement) { return res.json({ status: false, message: "No existe el anuncio." }) }
        await advertisement.addInvitation(employee.id, { through: { saved: saved, created_at: Date.now() } }).then(invitation => {
            return res.json({ status: true, message: "Impulsor favorito creado o modificado", data: invitation })
        })
    }
}