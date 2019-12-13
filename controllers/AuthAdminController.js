const text = require('../libs/text');
const { createToken } = require('../service/service')
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

            var token = createToken(user)

            return res.status(200).json({ status: true, message: 'OK', data: administrador, token: token  })
            
        } catch (error)  {  returnError(res, error) } 

    },

    signIn: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { returnError(res, text.validationData, errors.array()) }

        const { email, password } = req.body

        try {
            const admin = await models.administrador.findOne({ where: { email: email } })
            if(!admin) throw (text.failLogin)

            const statusPass = bcrypt.compareSync(password, administrador.password)
            if(!statusPass) throw (text.failLogin)

            const token = createToken(admin)

            return res.status(200).json({ status: true, message: 'OK', data: admin, token: token  })
            
        } catch(error) { returnError(res, error) }

    },

    updateAdmin: async (req, res) => {

    },

    me: (req, res) => {
        try 
        {
            return res.status(200).json({ status: true, data: req.admin })

        } catch (error) {
            return res.status(500).json({error: error})
        }
    },

}