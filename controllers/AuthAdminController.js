const text = require('../libs/text');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const models = require('../models/index');
const { sendEmail } = require('../libs/mail')
const { check, validationResult } = require('express-validator');
const { existById } = require('../controllers/elementController');
const { successful, returnError } = require('../controllers/responseController');
const { createToken, createTokenForgot, verifyTokenForgot } = require('../service/service')

module.exports = {

    validate: (review) => {

        const id = check('admin_id').exists().withMessage(text.id('administrador'))
        const token = check('token').exists().withMessage(text.tokenNotProvided)
        const email = check('email').exists().withMessage(text.email('administrador'))
        const name = check('name').exists().withMessage(text.name('administrador'))
        const password = check('password').exists().withMessage(text.password('administrador'))

        switch (review) {
            case 'sign-up':
                return [ name, email, password ]
            case 'sign-in':
                return [ email, password ]
            case 'forgot-password':
                return [ email ]
            case 'reset-get':
                return [ token ]
            case 'reset-post':
                return [ id, password ]
            
        }
    },

    signUp:  async(req, res) => {

        const { name, email, password, status } = req.body

        try 
        {
            const [ admin, created ] = await models.administrador.findOrCreate({
                where: { email: email },
                defaults: {
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(password),
                    status: (status) ? status : 1
                }
            });
            
            if (!created) throw text.duplicateEmail

            const token = createToken(admin)

            const response = { id: admin.id, name: admin.name, email: admin.email, token: token }

            return successful(res, 'Ok', response)
            
        } catch (error) { return returnError(res, error) } 

    },

    signIn: async(req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { email, password } = req.body

        try 
        {
            const admin = await models.administrador.findOne({ where: { email: email } })
            if(!admin) throw (text.failLogin)

            const statusPass = bcrypt.compareSync(password, admin.password)
            if(!statusPass) throw (text.failLogin)

            const token = createToken(admin)

            const response = { id: admin.id, name: admin.name, email: admin.email, token: token }

            return successful(res, 'Ok', response)
            
        } catch (error) { return returnError(res, error) } 

    },

    updateAdmin: async (req, res) => {

    },

    me: async (req, res) => {
        try 
        {
            const admin = await models.administrador.findOne({
                attributes: [ 'id', 'name', 'email' ],
                where: { id: req.user }
            })

            return successful(res, 'OK', admin)

        } catch (error) { return returnError(res, error) }

    },

    forgotPassword: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { email } = req.body

        try 
        {
            const admin = await models.administrador.findOne({ where: { email: email } });

            if (!admin) successful(res, text.notFoundElement)

            const token = createTokenForgot(admin.id, '30m')

            const email_info = { to: admin.email, subject: 'Cambiar de contraseña.', template: 'reset-pass-admin' }

            const data_send =  {
                title: 'Problemas al iniciar sesión',
                name: admin.name,
                text: 'Notamos que tienes problemas para iniciar sesión.',
                description: 'Por favor renueva tu contraseña haciendo click al botón.',
                url: 'http:\/\/' + 'localhost:8088' + '\/admin\/reset\/' + token,
                boton: 'Restaurar contraseña'
            }
    
            sendEmail(email_info, data_send)

            return successful(res, 'Ok')
            
        } catch (error) { return returnError(res, error) }

    },

    verifyToken: (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { token } = req.params

        verifyTokenForgot(token)
        .then(response => {
            return successful(res, 'OK', response)
        })
        .catch(error => {
            return res.status(200).json({ status: false, message: error, data: {  } })
        })

    } ,

    resetPassword: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { admin_id, password } = req.body

        try 
        {
            var admin = await models.administrador.findOne({ where: { id: admin_id } });
            if (!admin) successful(res, text.notFoundElement)

            await admin.update({ password: bcrypt.hashSync(password) })
            const token = createToken(admin)

            const response = { id: admin.id, name: admin.name, email: admin.email, token: token }

            return successful(res, 'Contraseña restaurada satisfactoriamente.', response)
            
        } catch (error) { return returnError(res, error) }

    },
}