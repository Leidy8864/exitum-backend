const helper = require('../libs/helper');
const models = require('../models/index');
const config = require('../config/index');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const moment = require('moment');
const index = require('../config/index');

const { check, validationResult } = require('express-validator');
const s3 = require('../libs/aws-s3');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/user-profile';


module.exports = {
    //Función encargada de validar los campos que se reciben desde el FrontEnd
    validate: (method) => {
        var message_exists = "Este campo es obligatorio";
        var message_string = "Este campo deber ser un string";
        var message_numeric = "Este campo debe ser numérico";
        var check_email = check('email').exists().withMessage(message_exists).isEmail().withMessage("Este campo deber ser un email válido");
        var check_password = check('password', message_exists).exists()
        switch (method) {

            case 'signUp':
                return [
                    check('name').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('lastname').exists().withMessage(message_exists).isString().withMessage(message_string),
                    // check('country_id', message_exists).exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                    check_email,
                    check_password.isLength({ min: 8 }).withMessage("Cantidad mínima de caracteres 8")
                ]
            case 'login':
                return [
                    check_email,
                    check_password
                ]
            case 'confirmPassword':
                return [
                    check('new_password').exists(),
                    check('verify_password').exists()
                ]
            case 'resend':
                return [
                    check_email
                ]
        }
    },
    //Función encargada de realizar el registro de usuario de manera local
    signUp: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: false, message: "Campos incorrectas.", data: { errors: errors.array() } });
        }
        try {
            const user = await models.user.findOne({ where: { email: req.body.email } });
            if (user) {
                return res.status(422).json({
                    message: "Este email ya ha sido registrado"
                });
            } else {
                const result = await models.sequelize.transaction(async (t) => {

                    // const country = await models.country.findOne({ where: { id: req.body.country_id } }, { transaction: t });

                    const newUser = await models.user.create({
                        name: req.body.name,
                        lastname: req.body.lastname,
                        method: 'local',
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password),
                        active: true,
                        confirmed: false,
                        role: 'employee',
                        // country_id: country.id || 1,
                        country_id: 1,
                        // currency_id: country.currency_id || 1
                        currency_id: 1
                    }, { transaction: t });
                    console.log("insert")
                    // if (req.body.role === "entrepreneur") {
                    //     await models.entrepreneur.create({
                    //         user_id: newUser.id
                    //     }, { transaction: t });
                    // }

                    const token = crypto.randomBytes(16).toString('hex')
                    await models.token.create({
                        token: token,
                        user_id: newUser.id,
                        token_created_at: Date.now()
                    }, { transaction: t });

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: index.emailExitum,
                            pass: index.passwordExitum
                        }
                    });
                    transporter.verify(function (error, success) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log("El servidor esta listo para enviar mensajes.");
                            var mailOptions = {
                                from: index.emailExitum,
                                to: newUser.email,
                                subject: 'Verificacion de la cuenta',
                                text: 'Hola,\n\n' + 'Por favor verifique su cuenta haciendo click en: \nhttp:\/\/' + req.headers.host + '\/users/confirmation\/' + token + '\n',
                            };
                            transporter.sendMail(mailOptions).then(() => {
                                console.log('Un email de verificación ha sido enviado a ' + newUser.email + '.');
                            }).catch(err => {
                                console.log("Error: " + err)
                                res.status(500).json({ status: false, message: err.message })
                            })
                        }
                    });
                    return newUser;
                });
                return helper.generateAccessData(result, res);
            }
        } catch (error) {
            console.log("Error", error);
            return res.status(500).json({ status: 200, message: "Error al registrar el usuario" });
        }
    },

    //Función creada para la verificación del correo del usuario
    confirmation: async (req, res) => {
        const token = await models.token.findOne({ where: { token: req.params.token } })
        if (token) {
            if (moment(token.token_created_at).add(1, 'd').toDate() >= Date.now()) {
                const user = await models.user.findOne({ where: { id: token.user_id } })
                if (user) {
                    if (user.confirmed) {
                        console.log({ type: 'already-verified', message: 'Este usuario fue verificado.' });
                    } else {
                        const newUser = await models.user.update({ confirmed: true }, { where: { id: user.id } })
                        if (newUser) {
                            console.log("La cuenta fue verificada.");
                            return helper.generateAccessData(newUser, res);
                        }
                    }
                    return helper.generateAccessData(user, res);
                } else {
                    res.json({ status: false, message: 'No pudimos encontrar al usuario con este token.' });
                }
            } else {
                res.json({ status: false, message: 'No pudimos encontrar un token válido. Su token expiro.' });
            }
            return helper.generateAccessData(token, res);
        } else {
            res.json({ status: false, message: 'No pudimos encontrar un token válido.' });
        }
    },

    //Funcion para enviar un nuevo token para la verificación del correo
    resendToken: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: false, message: "Campos incorrectas.", data: { errors: errors.array() } });
        }
        try {
            const user = await models.user.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.json({ status: false, message: "Este correo no esta registrado" })
            } else {
                if (user.confirmed) {
                    return res.json({ status: false, message: "Esta cuenta ya fue verificada" });
                } else {
                    const token = crypto.randomBytes(16).toString('hex')
                    const newToken = await models.token.update({ token: token }, { where: { user_id: user.id } });
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: index.emailExitum,
                            pass: index.passwordExitum
                        }
                    });
                    transporter.verify(function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("El servidor esta listo para enviar mensajes.");
                            var mailOptions = {
                                from: index.emailExitum,
                                to: user.email,
                                subject: 'Verificacion de la cuenta',
                                text: 'Hola,\n\n' + 'Por favor verifique su cuenta haciendo click en: \nhttp:\/\/' + req.headers.host + '\/users/confirmation\/' + token + '\n',
                            };
                            transporter.sendMail(mailOptions).then(() => {
                                console.log('Un email de verificación ha sido enviado a ' + user.email + '.');
                            }).catch(err => {
                                console.log("Error: " + err)
                                res.status(500).json({ status: false, message: err.message })
                            })
                        }
                    });
                    return helper.generateAccessData(newToken, res);
                }
            }
        } catch (error) {
            console.log('Algo esta fallando: ' + error);
            res.status(200).send({ status: false, message: "Hubo un error en el sistema, favor de intentarlo en unos minutos." })
        }
    },

    //Función encargada de realizar la autenticación del usuario de manera local
    signIn: (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Credenciales incorrectas, por favor intentelo nuevamente.", data: errors.array() });
        }
        const userData = {
            email: req.body.email,
            password: req.body.password
        };
        models.user.findOne({ where: { email: userData.email, method: 'local' } }).then(user => {
            if (!user) {
                res.status(200).send({ status: false, message: "Credenciales incorrectas, por favor intentelo nuevamente." });
            } else {
                const resultPassword = bcrypt.compareSync(userData.password, user.password);
                if (resultPassword) {
                    helper.generateAccessData(user, res);
                } else {
                    res.status(200).send({ status: false, message: "Credenciales incorrectas, por favor intentelo nuevamente." });
                }
            }
        }).catch(error => {
            console.log('Algo esta fallando: ' + error);
            res.status(200).send({ status: false, message: "Hubo un error en el sistema, favor de intentarlo en unos minutos." })
        });
    },

    //Función encargada de realizar el registro de usuario o login de usuario con proveedores
    socialLoginOrRegister: async (req, res) => {
        var user = null;

        console.log("--------------");
        try {
            user = req.user
            if (user) {
                const existingUser = await models.user.findOne({ where: { email: user.email, provider_id: user.id } });
                if (existingUser) {
                    console.log("User exists");
                    return helper.generateAccessData(existingUser, res);
                } else {
                    const result = await models.sequelize.transaction(async (t) => {

                        console.log("El usuario no existe en la BD estamos creando uno nuevo");
                        const newUser = await models.user.create({
                            name: user.name,
                            lastname: user.lastname,
                            method: req.body.method,
                            provider_id: user.id,
                            confirmed: false,
                            active: true,
                            email: user.email,
                            role: 'employee',
                            photo: user.image,
                            country_id: 1,
                            currency_id: 1
                        }, { transaction: t });

                        if (req.body.role === "entrepreneur") {
                            await models.entrepreneur.create({
                                user_id: newUser.id
                            }, { transaction: t });
                        }

                        return newUser;
                    });
                    return helper.generateAccessData(result, res);
                }

            } else {
                return res.status(500).send("Error al obtener información del usuario");
            }
        } catch (error) {
            console.log("Error", error);

            var message = '';
            if (error.name === 'SequelizeUniqueConstraintError') {

                message = 'Este email ya ha sido registrado';

            } else {
                message = 'Error al registrar el usuario'
            }
            return res.status(500).json(
                {
                    message: message
                });
        }
    },

    //Función encargada de generar un token para el cambio de password
    forgotPassword: async (req, res) => {
        const user = await models.user.findOne({ where: { email: req.body.email } });
        if (user) {
            const token_password = crypto.randomBytes(16).toString('hex');
            const token = await models.token.update({
                token_password: token_password,
                token_password_created_at: Date.now()
            }, { where: { user_id: user.id } });
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: index.emailExitum,
                    pass: index.passwordExitum
                }
            });
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("El servidor esta listo para enviar mensajes.");
                    var mailOptions = {
                        from: index.emailExitum,
                        to: req.body.email,
                        subject: 'Recuperacion de la cuenta',
                        text: 'Hola,\n\n' + 'Por favor recupere su cuenta haciendo click en: \nhttp:\/\/' + req.headers.host + '\/users/reset\/' + token_password + '\n',
                    };
                    transporter.sendMail(mailOptions).then(() => {
                        console.log('Un email de verificación ha sido enviado a ' + req.body.email + '.');
                    }).catch(err => {
                        console.log("Error: " + err)
                        res.status(500).json({ status: false, message: err.message })
                    })
                }
            });
            return helper.generateAccessData(token, res)
        } else {
            return res.json({ status: false, message: 'Este correo no se encuentra registrado' })
        }
    },

    //Funcion encargada de cambiar el password
    resetPassword: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: false, message: 'Campos incorrectos', data: errors.array() });
        }
        const token = await models.token.findOne({ where: { token_password: req.params.token } })
        if (token) {
            if (moment(token.token_password_created_at).add(30, 'm').toDate() >= Date.now()) {
                if (req.body.new_password === req.body.verify_password) {
                    const newUser = await models.user.update({ password: bcrypt.hashSync(req.body.new_password) }, { where: { id: token.user_id } })
                    if (newUser) {
                        console.log("Se cambio el password.");
                        return helper.generateAccessData(newUser, res);
                    }
                    return helper.generateAccessData(token, res);
                } else {
                    res.json({ status: false, message: 'Los password no coinciden' })
                }
            } else {
                res.json({ status: false, message: 'No pudimos encontrar un token válido. Su token expiro.' });
            }
        } else {
            res.json({ status: false, message: 'No pudimos encontrar un token válido.' });
        }
    },

    updateUser: async (req, res) => {
        try {
            var photo = req.files.photo;
            const user = await models.user.findOne({ where: { id: req.body.user_id } });

            if (user) {

                if (user.photo) {
                    console.log("Errrror papa", user.photo);
                    s3.deleteObject(NEW_BUCKET_NAME, user.photo);
                }
                const fileName = s3.putObject(NEW_BUCKET_NAME, photo);

                await user.update({
                    name: req.body.name,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    photo: fileName,
                    active: req.body.active,
                    role: req.body.role
                });

                if (req.body.role === "entrepreneur") {
                    await models.entrepreneur.create({
                        user_id: user.id
                    });
                }
                return res.status(200).json({ status: 200, message: "Usuario actualizado correctamente" });
            } else {
                return res.json({ status: false, message: "No existe el usuario" })
            }
        } catch (error) {
            console.log("Errrror", error);
            return res.json({ status: false, message: "Error al actualizar el usuario", });
        }
    },

    listCountry: (req, res) => {
        models.country.findAll().then(countries => {
            if (countries) {
                return res.status(200).json({ status: 200, countries: countries })
            } else {
                return res.json({ status: false, message: "No hay paises registrados" })
            }
        })
    }
}