'use strict'
var models = require('../models/index')

module.exports = {
    createProject: function (req, res) {
        var id = req.body.id //id del usuario emprendedor
        var title = req.body.title
        var days = req.body.days
        var description = req.body.description
        var other_role = req.body.other_role
        var type_project = req.body.type_project
        var active = req.body.active
        var category_id = req.body.category
        var role_id = req.body.role
        var state_id = re.body.state
        var budget_id = req.body.budget
        var startup_id = req.body.status
        
        check('title', 'Titulo es campo obligatorio').isEmpty();
        check('days', 'Días es campo obligatorio').isEmpty();
        check('description', 'Descripcion es campo obligatorio').isEmpty();
        check('type_project', 'Debes elegir un tipo de projecto').isEmpty();
        check('active', 'Su cuenta no esta autentificada').isEmpty();

        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);

        models.project.create({
            title: title,
            days: days,
            description: description,
            other_role: other_role,
            type_project: type_project,
            active: active,
            category_id: category_id,
            role_id: role_id,
            state_id: state_id,
            budget_id: budget_id,
            startup_id: startup_id
        }).then(project => {
            if (project){
                res.satus(200).json({msg:'Proyecto creado correctamente'})
            } else {
                res.status(201).json({msg: 'No hay proyectos creados'})
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.json(err)
        })
    },

    listBudgets: function (res, res) {
        models.budget.findAll().then(budgets => {
            if (budgets) {
                res.status(200).json({ budgets: budgets })
            } else {
                res.status(400).json({ msg: 'Budget esta vacío' })
            }
        });
    },

    listStates: function (req, res) {
        models.state.findAll().then(states => {
            if (states) {
                res.status(200).json({ states: states })
            } else {
                res.status(400).json({ msg: 'No existen states' })
            }
        })
    },

    listRoles: function (req, res) {
        models.role.findAll().then(roles => {
            if (roles) {
                res.status(400).json({ msg: 'No hay roles registrados' })
            } else {
                res.status(200).json({ roles: roles })
            }
        })
    },

    updateProject: function(res, res) {
       
        check('title', 'Titulo es campo obligatorio').isEmpty();
        check('days', 'Días es campo obligatorio').isEmpty();
        check('description', 'Descripcion es campo obligatorio').isEmpty();
        check('type_project', 'Debes elegir un tipo de projecto').isEmpty();
        check('active', 'Su cuenta no esta autentificada').isEmpty();

        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);

        new_project = {
            title: req.body.title,
            days: req.body.days,
            description: req.body.description,
            type_project: req.body.type_project,
            active: req.body.active,
            category_id: category_id,
            role_id: req.body.category,
            other_role: req.body.role_id,
            state_id: req.body.state_id,
            budget_id: req.body.budget_id,
            startup_id: req.body.startup_id
        }
        selector = { startup_id: req.body.startup_id }
        models.project.update(new_project, ).then(project => {
            if (project){
                res.satus(200).json({msg:'Proyecto creado correctamente'})
            } else {
                res.status(201).json({msg: 'No hay proyectos creados'})
            }
        }).catch(err => {
            console.log("Error: " + err)
            res.json(err)
        })
    }
}