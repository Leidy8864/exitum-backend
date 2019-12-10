const text = require('../libs/text');
const { generateAccessAdmin } = require('../libs/helper');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');

async function createArea (name) {

    var [ area, created ] = await  models.area.findOrCreate({
        where: { name: name },
        defaults: { name: name }
    })
    return await area
    
}

module.exports = {

    validate: (review) => {

        const name = check('name').exists().withMessage(text.name('administrador'))
        const email = check('email').exists().withMessage(text.email('administrador'))
        const password = check('password').exists().withMessage(text.password('administrador'))

        switch (review) {
            case 'sign-up':
                return [ name, email, password ]
            case 'sign-in':
                return [ email, password ]
        }
    },

    signUp:  async(req, res) => {

        const { name, email, password, status } = req.body

        try 
        {
            const [ administrador, created ] = await models.administrador.findOrCreate({
                where: { email: email },
                defaults: {
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(password),
                    status: (status) ? status : 1
                }
            });
            
            if (!created) throw text.duplicateEmail

            const admin = generateAccessAdmin(administrador)

            successful(res, text.successCreate('administrador'), admin)
            
        } catch (error)  {  returnError(res, error) } 

    },

    signIn: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { email, password } = req.body

        try {
            const administrador = await models.administrador.findOne({ where: { email: email } })
            if(!administrador) throw (text.failLogin)

            const statusPass = bcrypt.compareSync(password, administrador.password)
            if(!statusPass) throw (text.failLogin)

            const admin = generateAccessAdmin(administrador)

            successful(res, 'OK', admin)
            
        } catch(error) { returnError(res, error) }

    },

    updateAdmin: async (req, res) => {

    },

}