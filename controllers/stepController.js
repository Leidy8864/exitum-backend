const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('./elementController');
const { check, validationResult } = require('express-validator');

module.exports = {

    startup:  async (req, res) => {
        
        const { project_id } = req.params

        return res.status(200).json({ status: true, message: "OK", data: 
            [ 
                { id_reto: 1, title : "Lorem Ipsum is simply dummy", status: "completado" },
                { id_reto: 2, title : "It is a long established fact that a reader", status: "pendiente" },
                { id_reto: 3, title : "Lorem Ipsum is therefore always free", status: "pendiente" },
                { id_reto: 3, title : "The standard chunk of Lorem Ipsum", status: "observado" },
            ] 
        })

    },

    show: async(req, res) => {

        const { step_id } = req.params

        return res.status(200).json({ status: true, message: "OK", data: 
                {   title : "Contrary to popular belief", 
                    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.", 
                    files: [ { name: "file.docx", file: "https://www.exitum.com/files/file.docx" } ] 
                }
        })

    }
}