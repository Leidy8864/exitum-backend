const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('./elementController');
const { check, validationResult } = require('express-validator');

module.exports = {

    startup:  async (req, res) => {
        
        const { project_id } = req.params

        return res.status(200).json({ status: true, message: "OK", data: 
            [ 
                { id_reto: 1, title : "Realizar model business canvas", status: "completado" },
                { id_reto: 2, title : "Valida tu modelo business canvas", status: "pendiente" },
                { id_reto: 3, title : "Trabaja con impulsores", status: "pendiente" },
                { id_reto: 3, title : "Realiza un MVP de tu idea.", status: "observado" },
            ] 
        })

    },

    show: async(req, res) => {

        const { step_id } = req.params

        return res.status(200).json({ status: true, message: "OK", data: 
                {   title : "Realizar model business canvas", 
                    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.", 
                    files: [ { name: "model-business-canvas.docx", file: "https://www.exitum.com/files/model-business-canvas.docx" } ] 
                }
        })

    }
}