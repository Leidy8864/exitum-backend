const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('./elementController');
const { check, validationResult } = require('express-validator');

module.exports = {

    startup:  async (req, res) => {
        
        const { project_id } = req.params

        return res.status(200).json({ status: true, message: "OK", data: 
            [ 
                { id_reto: 1, title : "Diego llama", status: "completado" },
                { id_reto: 2, title : "Jeanpier kbro :v", status: "pendiente" },
                { id_reto: 3, title : "Aldo manco", status: "pendiente" },
                { id_reto: 3, title : "Diego1 kk", status: "observado" },
            ] 
        })

    },

    show: async(req, res) => {

        const { step_id } = req.params

        return res.status(200).json({ status: true, message: "OK", data: 
                { title : "Diego llama", description: "description", files: [ { name: "llama.docx", file: "https://www.exitum.com/files/llama.docx"} ] }
        })

    }
}