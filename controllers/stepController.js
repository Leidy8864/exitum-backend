const models = require('../models/index');
const Sequelize = require('sequelize');
const { existById } = require('./elementController');
const { check, validationResult } = require('express-validator');

module.exports = {

    step:  async (req, res) => {
        
        const { proyecto_id } = req.body

        return res.status(200).json({ status: true, message: "OK", data: 
            [ 
                { id_reto: 1, title : "Diego llama", status: "completado" },
                { id_reto: 2, title : "Jeanpier kbro :v", status: "pendiente" },
                { id_reto: 3, title : "Aldo manco", status: "pendiente" },
                { id_reto: 3, title : "Diego1 kk", status: "observado" },
            ] })

    }
}