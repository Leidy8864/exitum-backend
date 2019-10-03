const models = require('../models/index');
const { check, validationResult } = require('express-validator');

module.exports = {
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_array = "Este campo deber que ser un array";
        var message_numeric = "Este campo debe ser numérico";

        switch (method) {

            case 'create':
                return [
                    check('user_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('category_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('price_hour').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('about_me', message_exists).exists(),
                    check('short_description', message_exists).exists(),
                    check('languages', message_exists).exists().withMessage(message_exists).isArray().withMessage(message_array),
                    check('skills', message_exists).exists().withMessage(message_exists).isArray().withMessage(message_array),
                    check('types', message_exists).exists().withMessage(message_exists).isArray().withMessage(message_array)
                ]
            case 'update':
                return [
                    check('user_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('category_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('price_hour').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check('about_me', message_exists).exists(),
                    check('short_description', message_exists).exists()
                ]
        }
    },
    create: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ status: false, message: "Campos incorrectos", data: errors.array() });
        }
        var languages = req.body.languages;

        try {
            const result = await models.sequelize.transaction(async (t) => {

                const employee = await models.employee.create({
                    user_id: req.body.user_id,
                    category_id: req.body.category_id,
                    about_me: req.body.about_me,
                    short_description: req.body.short_description,
                    price_hour: req.body.price_hour,
                    stage_id : 1
                }, { transaction: t });
                await employee.addSkill(req.body.skills, { transaction: t });
                await employee.addType(req.body.types, { transaction: t });

                for (let i = 0; i < languages.length; i++) {
                    employee.addLanguage(languages[i].language_id, { through: { level_id: languages[i].level_id } }, { transaction: t });
                }
                return employee;
            });
            return res.status(200).json({  status : true ,message: "Impulsor creado correctamente",data: result });

        } catch (error) {
            console.log("Error" + error);

            res.status(200).json({
                status : false ,
                message: "Error al crear impulsor"
            });
        }
    },
    updateEmployee: async (req, res) => {
        const user_id = req.body.user_id;
        try {
            const employee = await models.employee.findOne({ where: { user_id: user_id } });
            if (employee) {

                await employee.update({
                    category_id: req.body.category_id,
                    about_me: req.body.about_me,
                    short_description: req.body.short_description,
                    price_hour: req.body.price_hour
                });

                return res.status(200).json({ status: true, message: "Empleado actualizado correctamente", data : employee});
            } else {
                return res.status(200).json({ status: false, message: "No existe el empleado" });

            }

        } catch (error) {
            console.log("Error" + error);
            return res.status(200).json(
                {
                    status: false,
                    message: "Error al actualizar información del empleado"
                });
        }
    },
    updateSkills: async (req, res) => {
        const user_id = req.body.user_id;
        const skills = req.body.skills;
        try {
            const employee = await models.employee.findOne({ where: { user_id: user_id } });

            await models.employee_skill.destroy({ where: { employee_id: employee.id } });

            employee.addSkill(skills);

            return res.status(200).json({ status: true, message: "Skills actualizados correctamente" });

        } catch (error) {
            return res.status(200).json(
                {
                    status: false,
                    message: "Error al actualizar información del empleado",
                });
        }
    },
    updateLanguages: async (req, res) => {
        const user_id = req.body.user_id;
        const languages = req.body.languages;
        try {
            const employee = await models.employee.findOne({ where: { user_id: user_id } });

            await models.employee_language.destroy({ where: { employee_id: employee.id } });

            for (let i = 0; i < languages.length; i++) {
                employee.addLanguage(languages[i].language_id, { through: { level_id: languages[i].level_id } });
            }

            return res.status(200).json({ status: true, message: "Lenguajes actualizados correctamente" });

        } catch (error) {
            return res.status(200).json(
                {
                    status: false,
                    message: "Error al actualizar información del empleado",
                });
        }
    },
    updateTypes: async (req, res) => {
        const user_id = req.body.user_id;
        const types = req.body.types;
        try {
            const employee = await models.employee.findOne({ where: { user_id: user_id } });

            await models.employee_type.destroy({ where: { employee_id: employee.id } });

            await employee.addType(types);

            return res.status(200).json({ status: true, message: "Tipo de impulsor actualizado correctamente" });

        } catch (error) {
            return res.status(200).json(
                {
                    status: false,
                    message: "Error al actualizar información del empleado",
                });
        }
    },
    listEmployeeById: async (req, res) => {

        var user_id = req.params.user_id;

        try {


            const employee = await models.employee.findOne({
                where: {
                    user_id: user_id
                },
                include: [
                    {
                        model: models.category
                    },
                    {
                        model: models.education,
                        as: 'education',
                        include: [{
                            model: models.university
                        }]
                    },
                    {
                        model: models.experience,
                        as: 'experience'
                    },
                    {
                        model: models.recommendation,
                        as: 'recommendation'
                    },
                    {
                        model: models.language,
                    },
                    {
                        model: models.skill,
                    }
                ]
            });

            res.status(200).json({ status : true, message : "OK", data : employee });

        } catch (error) {
            console.log(error);
            res.status(200).json({status : true, message : "Error al listar información de empleado"});
        }
    }
}