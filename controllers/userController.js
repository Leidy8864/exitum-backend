const text = require('../libs/text');
const helper = require('../libs/helper');
const models = require('../models/index');
const { highlight } = require('./skillController')
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { createToken } = require('../service/service')
const hbs = require('nodemailer-express-handlebars');
const moment = require('moment');
const index = require('../config/index');
const s3 = require('../libs/aws-s3');
const { check, validationResult } = require('express-validator');
const { successful, returnError } = require('../controllers/responseController');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/imagenes/user-profile';
var cron = require("node-cron");

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
                    check('lastname_1').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('lastname_2').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('emailConfirm').exists().withMessage(message_exists).isString().withMessage(message_string),
                    check('passwordConfirm').exists().withMessage(message_exists).isString().withMessage(message_string),
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
            case 'update':
                return [
                    check('user_id').exists().withMessage(message_exists).isNumeric().withMessage(message_numeric),
                ]
            case 'validateToken':
                return [
                    check('token').exists()
                ]
            case 'createWorkshop':
                return [
                    check('title').exists().withMessage(message_exists),
                    check('description').exists().withMessage(message_exists),
                    check('day').exists().withMessage(message_exists),
                    check('hour_start').exists().withMessage(message_exists),
                    check('hour_end').exists().withMessage(message_exists),
                    check('place').exists().withMessage(message_exists),
                    // check('lat').isNumeric(),
                    // check('lng').isNumeric(),
                    check('user_id').exists().withMessage(message_exists)
                ]
            case 'deleteWorkshop':
                return [
                    check('workshop_id').exists().withMessage(message_exists),
                ]
        }
    },


    //Función encargada de realizar el registro de usuario de manera local
    signUp: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Credenciales incorrectas, por favor intentelo nuevamente.", data: errors.array() });
        }
        try {
            const user = await models.user.findOne({ where: { email: req.body.email } });
            if (user) {
                res.status(200).send({ status: false, message: "Este email ya ha sido registrado" });
            } else {
                if (req.body.email !== req.body.emailConfirm) {
                    return res.json({ status: false, message: "El correo no coincide." })
                }
                if (req.body.password !== req.body.passwordConfirm) {
                    return res.json({ status: false, message: "La contraseña no coincide." })
                }
                const result = await models.sequelize.transaction(async (t) => {
                    // const country = await models.country.findOne({ where: { id: req.body.country_id } }, { transaction: t });
                    const newUser = await models.user.create({
                        name: req.body.name,
                        lastname: req.body.lastname_1 + ' ' + req.body.lastname_2,
                        lastname_1: req.body.lastname_1,
                        lastname_2: req.body.lastname_2,
                        genre: req.body.genre,
                        method: 'local',
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password),
                        active: true,
                        confirmed: false,
                        role: 'undefined',
                        from_hour: '7:00:00',
                        to_hour: '23:00:00',
                        // country_id: country.id || 1,
                        country_id: 165,
                        // currency_id: country.currency_id || 1
                        currency_id: 1,
                        avg_rating: 1
                    }, { transaction: t });
                    return newUser;
                });

                helper.accessData(result, function (response) {
                    models.token.create({
                        token: response.accessToken,
                        user_id: response.id,
                        token_created_at: Date.now()
                    });

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
                            const handlebarOptions = {
                                viewEngine: {
                                    extName: '.handlebars',
                                    partialsDir: './public/images',
                                    layoutsDir: './public',
                                    defaultLayout: 'template.handlebars',
                                },
                                viewPath: './public',
                                extName: '.handlebars',
                            };
                            transporter.use('compile', hbs(handlebarOptions));
                            var mailOptions = {
                                from: index.emailExitum,
                                to: req.body.email,
                                subject: 'Verificación de la cuenta',
                                template: 'template',
                                context: {
                                    title: 'Bienvenido a bordo',
                                    name: req.body.name + ' ' + req.body.lastname_1 + ' ' + req.body.lastname_2,
                                    text: 'En Exitum estamos felices de tener tu confianza',
                                    description: 'Por favor verifica tu cuenta dándole click al botón.',
                                    url: 'http:\/\/' + '35.175.241.103:5000' + '\/dashboard\?token=' + response.accessToken,
                                    boton: 'Verificar cuenta'
                                },
                            }
                            transporter.sendMail(mailOptions).then(() => {
                                console.log('Un email de verificación ha sido enviado a ' + req.body.email + '.');
                            }).catch(err => {
                                console.log("Error: " + err)
                                res.status(500).json({ status: false, message: err.message })
                            })
                        }
                    });
                });
                return helper.generateAccessData(result, res);
            }
        } catch (error) {
            console.log("Error", error);
            res.status(200).send({ status: false, message: "Error al crear usuario, favor de intentarlo en unos minutos." })

        }
    },

    //Función encargada de realizar la autenticación del usuario de manera local
    signIn: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({ status: false, message: "Credenciales incorrectas, por favor intentelo nuevamente.", data: errors.array() });
        }
        const userData = {
            email: req.body.email,
            password: req.body.password
        };
        const userSocial = await models.user.findOne({ where: { email: userData.email, method: 'google' || 'facebook' } })
        if (userSocial) {
            res.status(200).send({ status: false, message: "Credenciales incorrectas, por favor intentelo nuevamente." });
        } else {
            models.user.findOne({ where: { email: userData.email, method: 'local' } }).then(user => {
                if (!user) {
                    res.status(200).send({ status: false, message: "Esta cuenta no existe, por favor regístrese." });
                } else {
                    const resultPassword = bcrypt.compareSync(userData.password, user.password);
                    if (resultPassword) {
                        console.log(req.client.clientId)
                        // var token = createToken(user)
                        helper.generateAccessData(user, res);
                        // return res.status(200).json({ status: true, message: 'OK', data: token  })
                    } else {
                        res.status(200).send({ status: false, message: "Credenciales incorrectas, por favor intentelo nuevamente." });
                    }
                }
            }).catch(error => {
                console.log('Algo esta fallando: ' + error);
                res.status(200).send({ status: false, message: "Hubo un error en el sistema, favor de intentarlo en unos minutos." })
            });
        }
    },

    me: (req, res) => {
        try {

            return res.status(200).json({ status: true, data: req.user })

        } catch (error) {
            return res.status(500).json({ error: error })
        }
    },

    //Función encargada de realizar el registro de usuario o login de usuario con proveedores
    socialLoginOrRegister: async (req, res) => {
        // console.log("SOCIAL ", req);
        var user = null;
        try {
            user = req.body.user
            req.user ? user = req.user : '';
            if (user) {
                const existingUser = await models.user.findOne({ where: { email: user.email, provider_id: user.id } });
                if (existingUser) {
                    console.log("User exists");
                    return helper.generateAccessData(existingUser, res);
                } else {
                    const result = await models.sequelize.transaction(async (t) => {
                        console.log("El usuario no existe en la BD estamos creando uno nuevo");
                        const newUser = await models.user.create({
                            name: user.firstname,
                            lastname: user.lastname,
                            lastname_1: user.lastname,
                            provider_id: user.id,
                            confirmed: true,
                            active: true,
                            email: user.email,
                            role: 'undefined',
                            photo: user.photo,
                            from_hour: '7:00:00',
                            to_hour: '23:00:00',
                            country_id: 165,
                            currency_id: 1,
                            avg_rating: 1,
                            method: user.provider
                        }, { transaction: t });

                        await models.token.create({
                            token: "",
                            user_id: newUser.id,
                            token_created_at: Date.now()
                        }, { transaction: t });

                        return newUser;
                    });
                    return helper.generateAccessData(result, res);
                }
            } else {
                return res.status(200).json({ status: false, message: "Error al obtener información del usuario" })
            }
        } catch (error) {
            console.log("Error");
            var message = '';
            if (error.name === 'SequelizeUniqueConstraintError') {
                message = 'Este email ya ha sido registrado';
            } else {
                message = 'Hubo un error en el sistema, favor de intentarlo en unos minutos.'
            }
            return res.status(200).json({ status: false, message: message })
        }
    },

    //Función creada para la verificación del correo del usuario
    confirmation: async (req, res) => {
        const token = await models.token.findOne({ where: { token: req.params.token } })
        if (token) {
            //if (moment(token.token_created_at).add(1, 'd').toDate() >= Date.now()) {
            const user = await models.user.findOne({ where: { id: token.user_id }, attributes: { exclude: ['provider_id', 'password', 'method', 'active', 'last_login', 'avg_rating', 'country_id', 'currency_id'] } })
            if (user) {
                if (user.confirmed) {
                    return res.json({ status: true, message: "Esta cuenta ya fue verificada.", data: user })
                } else {
                    const newUser = await models.user.update({ confirmed: true }, { where: { id: user.id } })
                    if (newUser) {
                        const user_new = await models.user.findOne({ where: { id: token.user_id }, attributes: { exclude: ['provider_id', 'password', 'method', 'active', 'last_login', 'avg_rating', 'country_id', 'currency_id'] } })
                        return res.json({ status: true, message: "Su cuenta fue verificada.", data: user_new })
                    }
                }
            } else {
                res.json({ status: false, message: 'No pudimos encontrar al usuario con este token.' });
            }
            // } else {
            //     res.json({ status: false, message: 'No pudimos encontrar un token válido. Su token expiro.' });
            // }
        } else {
            res.json({ status: false, message: 'No pudimos encontrar un token válido.' });
        }
    },

    verification: async (req, res) => {
        const token = await models.token.findOne({ where: { token: req.params.token } })
        if (token) {
            //if (moment(token.token_created_at).add(1, 'd').toDate() >= Date.now()) {
            const user = await models.user.findOne({ where: { id: token.user_id } })
            if (user) {
                if (user.confirmed) {
                    return res.json({ status: true, message: "Esta cuenta ya fue verificada.", data: user })
                } else {
                    const newUser = await models.user.update({ confirmed: true }, { where: { id: user.id } })
                    if (newUser) {
                        return res.json({ status: true, message: "Su cuenta fue verificada.", data: newUser })
                    }
                }
            } else {
                res.json({ status: false, message: 'No pudimos encontrar al usuario con este token.' });
            }
            // } else {
            //     res.json({ status: false, message: 'No pudimos encontrar un token válido. Su token expiro.' });
            // }
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
                    helper.accessData(user, function (response) {
                        models.token.update({ token: response.accessToken }, { where: { user_id: user.id } });
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
                                const handlebarOptions = {
                                    viewEngine: {
                                        extName: '.handlebars',
                                        partialsDir: './public/images',
                                        layoutsDir: './public',
                                        defaultLayout: 'template.handlebars',
                                    },
                                    viewPath: './public',
                                    extName: '.handlebars',
                                };
                                transporter.use('compile', hbs(handlebarOptions));
                                var mailOptions = {
                                    from: index.emailExitum,
                                    to: user.email,
                                    subject: 'Verificación de la cuenta',
                                    //html: 'Hola,\n\n' + 'Por favor verifique su cuenta haciendo click en: \nhttp:\/\/' + 'localhost:8089' + '\/dashboard\/' + response.accessToken + '\n<img src="cid:unique@rojo"/>',
                                    template: 'template',
                                    context: {
                                        title: 'Bienvenido a bordo',
                                        name: user.name + ' ' + user.lastname_1 + ' ' + user.lastname_2,
                                        text: 'En Exitum estamos felices de tener tu confianza',
                                        description: 'Por favor verifica tu cuenta dándole click al botón.',
                                        url: 'http:\/\/' + '35.175.241.103:5000' + '\/dashboard\?token=' + response.accessToken,
                                        boton: 'Verificar cuenta'
                                    },
                                }
                                transporter.sendMail(mailOptions).then(() => {
                                    console.log('Un email de verificación ha sido enviado a ' + user.email + '.');
                                    res.json({ status: true, message: "Un email de verificación ha sido enviado a " + user.email + " ." })
                                }).catch(err => {
                                    console.log("Error: " + err)
                                    res.status(500).json({ status: false, message: err.message })
                                })
                            }
                        });
                    });
                }
            }
        } catch (error) {
            console.log('Algo esta fallando: ' + error);
            res.status(200).send({ status: false, message: "Hubo un error en el sistema, favor de intentarlo en unos minutos." })
        }
    },

    //Función encargada de generar un token para el cambio de password
    forgotPassword: async (req, res) => {
        const user = await models.user.findOne({ where: { email: req.body.email } });
        if (user) {
            const token_password = crypto.randomBytes(16).toString('hex');
            await models.token.update({
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
                    const handlebarOptions = {
                        viewEngine: {
                            extName: '.handlebars',
                            partialsDir: './public/images',
                            layoutsDir: './public',
                            defaultLayout: 'template.handlebars',
                        },
                        viewPath: './public',
                        extName: '.handlebars',
                    };
                    transporter.use('compile', hbs(handlebarOptions));
                    var mailOptions = {
                        from: index.emailExitum,
                        to: user.email,
                        subject: 'Recuperación de la cuenta',
                        //html: 'Hola,\n\n' + 'Por favor verifique su cuenta haciendo click en: \nhttp:\/\/' + 'localhost:8089' + '\/dashboard\/' + response.accessToken + '\n<img src="cid:unique@rojo"/>',
                        template: 'template',
                        context: {
                            title: 'Problemas al iniciar sesión',
                            name: user.name + ' ' + user.lastname_1 + ' ' + user.lastname_2,
                            text: 'Notamos que tienes problemas para iniciar sesión.',
                            description: 'Por favor renueva tu contraseña dándole click al botón.',
                            url: 'http:\/\/' + '35.175.241.103:5000' + '\/users\/reset\?token=' + token_password,
                            boton: 'Recuperar cuenta'
                        },
                    }
                    transporter.sendMail(mailOptions).then(() => {
                        console.log('Un email de recuperación ha sido enviado a ' + req.body.email + '.');
                        res.json({ status: true, message: 'Un email de recuperación ha sido enviado a ' + req.body.email });
                    }).catch(err => {
                        console.log("Error: " + err)
                        res.status(500).json({ status: false, message: err.message })
                    })
                }
            });
        } else {
            return res.json({ status: false, message: 'Este correo no se encuentra registrado' })
        }
    },

    validateToken: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: false, message: 'Campos incorrectos', data: errors.array() });
        }
        const token = await models.token.findOne({ where: { token_password: req.params.token } })
        if (token) {
            if (moment(token.token_password_created_at).add(30, 'm').toDate() >= Date.now()) {
                return res.json({ status: true, message: "Token valido.", data: { user_id: token.user_id } });
            } else {
                return res.json({ status: false, message: 'Su token expiro. Por favor vuelve a pedir un correo con tu nuevo token.' });
            }
        } else {
            return res.json({ status: false, message: 'No pudimos encontrar un token válido.' });
        }
    },

    //Funcion encargada de cambiar el password
    resetPassword: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: false, message: 'Campos incorrectos', data: errors.array() });
        }
        models.user.findOne({ where: { id: req.body.user_id } }).then(usr => {
            if (usr) {
                if (req.body.new_password === req.body.verify_password) {
                    const newUser = models.user.update({ password: bcrypt.hashSync(req.body.new_password) }, { where: { id: usr.id } })
                    if (newUser) {
                        console.log("Se cambio el password.");
                        return helper.generateAccessData(usr, res);
                    } else {
                        return res.json({ status: false, message: "No se pudo cambiar el password." });
                    }
                } else {
                    res.json({ status: false, message: 'Los password no coinciden' });
                }
            } else {
                res.json({ status: false, message: 'Id del usuario invalido' });
            }
        })
    },

    updateImage: async (req, res) => {

        const { user_id } = req.body

        try {
            const user = await models.user.findOne({
                where: { id: user_id },
                attributes: { exclude: ['password'] }
            });

            if (!user) return successful(res, text.notFoundElement, {}, 402)
            if (!req.files) return successful(res, text.requireImage, {}, 402)

            if (user.photo && user.photo != '' && !user.photo.indexOf(index.aws.s3.BUCKET_NAME)) {
                s3.deleteObject(NEW_BUCKET_NAME, (user.photo).split('/')[5]);
            }

            var photo = req.files.photo;
            fileName = s3.putObject(NEW_BUCKET_NAME, photo);
            await user.update({ photo: fileName });

            return successful(res, text.successUpdate('imagen'), user)

        } catch (error) { return returnError(res, error) }

    },

    updateUser: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id, name, lastname, lastname_1, lastname_2, genre, phone, role, birthday, description, skill_id, active, country_phone_id } = req.body

        try {
            const user = await models.user.findOne({
                where: { id: user_id },
                attributes: { exclude: ['password'] }
            });

            if (user) {

                var fileName = user.photo;

                if (req.files) {

                    if (user.photo && !user.photo.indexOf(index.aws.s3.BUCKET_NAME)) {
                        s3.deleteObject(NEW_BUCKET_NAME, user.photo);
                    }
                    var photo = req.files.photo;
                    fileName = s3.putObject(NEW_BUCKET_NAME, photo);
                }
                var lastnameComp = null
                if (lastname_1 && lastname_2) {
                    lastnameComp = lastname_1 + ' ' + lastname_2
                }
                await user.update({
                    name: name,
                    lastname: lastnameComp,
                    lastname_1: lastname_1,
                    lastname_2: lastname_2,
                    genre: genre,
                    phone: phone,
                    photo: fileName,
                    active: active || true,
                    role: role,
                    birthday: birthday,
                    description: description,
                    country_phone_id: country_phone_id,
                    last_login: Date.now()
                });

                await highlight(user, skill_id)

                if (req.body.role === "entrepreneur") {

                    const entrepreneur = await models.entrepreneur.findOne({ where: { user_id: user.id } });

                    if (!entrepreneur) {
                        await models.entrepreneur.create({
                            user_id: user.id
                        });
                    } else {
                        return res.json({ status: false, message: "Ya fue registrado como emprendedor" })
                    }

                    return res.status(200).json({ status: true, message: "Usuario actualizado correctamente", data: user });

                } else if (req.body.role === "employee") {
                    const employee = await models.employee.findOne({ where: { user_id: req.body.user_id } });

                    if (employee) {
                        return res.json({ status: false, message: "Ya fue registrado como impulsor" })
                    } else {
                        try {
                            const result = await models.sequelize.transaction(async (t) => {

                                const employee = await models.employee.create({
                                    user_id: req.body.user_id,
                                    category_id: 1,
                                    stage_id: 6
                                }, { transaction: t });

                                await employee.addType(req.body.types || 1, { transaction: t });
                                var chlls = []
                                var steps = []

                                await models.stage.findAll({
                                    where: {
                                        type: 'employee'
                                    },
                                    include: [
                                        {
                                            model: models.step,
                                            include: [
                                                {
                                                    model: models.tip
                                                }
                                            ]
                                        }
                                    ]
                                }, { transaction: t }).then(stages => {
                                    var duracion_dias = 0

                                    for (var x = 0; x < stages.length; x++) {
                                        for (var y = 0; y < stages[x].steps.length; y++) {
                                            for (var z = 0; z < stages[x].steps[y].tips.length; z++) {

                                                duracion_dias = parseInt(stages[x].steps[y].tips[z].duration_days) + duracion_dias

                                                chlls.push(
                                                    {
                                                        user_id: req.body.user_id,
                                                        employee_id: employee.id,
                                                        stage_id: stages[x].id,
                                                        step_id: stages[x].steps[y].id,
                                                        tip_id: stages[x].steps[y].tips[z].id,
                                                        checked: false,
                                                        status: "Sin respuesta",
                                                        date: Date.now(),
                                                        date_max: moment(Date.now()).add(stages[x].steps[y].tips[z].duration_days, 'd').toDate()
                                                    }
                                                )
                                            }

                                            steps.push(
                                                {
                                                    employee_id: employee.id,
                                                    step_id: stages[x].steps[y].id,
                                                    tip_completed: 0,
                                                    icon_count_tip: 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg',
                                                    state: 'incompleto',
                                                    date_initial: Date.now()
                                                }
                                            )
                                        }
                                    }
                                })
                                await models.challenge.bulkCreate(chlls, { transaction: t });
                                await models.employee_step.bulkCreate(steps, { transaction: t });
                                return employee;
                            });
                            return res.status(200).json({ status: true, message: "Usuario actualizado correctamente", data: user });

                        } catch (err) {
                            console.log(err);
                            res.status(200).json({ status: false, message: "Error al crear impulsor" });
                        }
                    }
                } else {
                    return res.status(200).json({ status: true, message: "Usuario actualizado correctamente", data: user });
                }
            } else {
                return res.json({ status: false, message: "No existe el usuario" })
            }

        } catch (error) { return returnError(res, error) }

    },

    listCountry: (req, res) => {
        models.country.findAll().then(countries => {
            if (countries) {
                return res.status(200).json({ status: true, message: "OK", data: countries })
            } else {
                return res.status(200).json({ status: false, message: "No hay paises registrados" })
            }
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Lo sentimos, vuelva a intentarlo" })
        })
    },

    listCityByCountry: (req, res) => {
        const { country_id } = req.query
        let whereCondition = {};
        if (country_id) {
            whereCondition = {
                where: {
                    country_id: country_id
                }
            }
        }
        models.department.findAll(whereCondition).then(department => {
            if (department) {
                return res.status(200).json({ status: true, message: "OK", data: department })
            } else {
                return res.status(200).json({ status: false, message: "No hay paises registrados" })
            }
        }).catch(err => {
            console.log(err)
            return res.json({ status: false, message: "Lo sentimos, vuelva a intentarlo" })
        })
    },

    show: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params

        try {
            const user = await models.user.findByPk(user_id,
                {
                    attributes: ['id', 'name', 'lastname_1', 'lastname_2', 'email', 'confirmed', 'phone', 'last_login', 'photo', 'avg_rating', 'from_hour',
                        'to_hour', [Sequelize.fn('Date_format', Sequelize.col('birthday'), '%Y-%m-%d'), 'birthday'], 'description'
                    ],
                    include: [
                        {
                            model: models.skill,
                            as: 'toUserSkills',
                            attributes: { exclude: ['icon'] }
                        },
                        {
                            model: models.experience,
                            as: 'experience'
                        },
                        {
                            model: models.country
                        },
                        {
                            model: models.unavailable,
                            as: 'unavailables'
                        }
                    ],
                    order: [[{ model: models.experience }, 'date_start', 'DESC']],

                })

            // var 

            // var unavailables = await user.getUnavailables()

            return successful(res, 'OK', user)

        } catch (error) { return returnError(res, error) }

    },

    createWorkshop: (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(200).send({ status: false, message: "Campos incorrectos", data: errors.array() });
        }

        const { title, description, day, hour_start, hour_end, place, lat, lng, user_id } = req.body
        models.user.findOne({ where: { id: user_id } }).then(user => {
            if (!user) {
                return res.json({ status: false, message: "Este usuario no existe." })
            } else {
                models.workshop.create({
                    title: title,
                    description: description,
                    day: day,
                    hour_start: hour_start,
                    hour_end: hour_end,
                    place: place,
                    lat: lat,
                    lng: lng,
                    user_id: user.id
                }).then(workshop => {
                    if (workshop) {
                        return res.json({ status: 200, message: "Taller creado correctamente", data: workshop })
                    } else {
                        return res.json({ status: false, message: "No se creo el taller" })
                    }
                }).catch(err => {
                    return res.json({ status: false, message: "Ocurrio un problema, intentelo nuevamente" })
                })
            }
        })
    },

    updateWorkshop: (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(200).send({ status: false, message: "Campos incorrectos", data: errors.array() });
        }

        const { title, description, day, hour_start, hour_end, place, lat, lng, workshop_id } = req.body
        models.workshop.update({
            title: title,
            description: description,
            day: day,
            hour_start: hour_start,
            hour_end: hour_end,
            place: place,
            lat: lat,
            lng: lng,
        }, { where: { id: workshop_id } }).then(() => {
            return res.json({ status: true, message: "Taller actualizado correctamente" })
        }).catch(err => {
            return res.json({ status: false, message: "Ocurrio un problema, intentelo nuevamente" })
        })
    },

    deleteWorkshop: async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(200).send({ status: false, message: "Campos incorrectos", data: errors.array() });
        }
        const { workshop_id } = req.body
        try {
            const workshop = await models.workshop.findByPk(workshop_id);
            const del = await workshop.destroy()
            if (del) {
                return res.json({ status: true, message: "Eliminado correctamente" })
            }
        } catch (err) {
            console.log(err)
            return res.json({ status: false, message: "Ocurrio un problema, intentelo nuevamente" })
        }

    },

    allUser: async (req, res) => {

        try {

            const { user_id } = req.params

            var user = await models.user.findAll({ attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('name'), ' ', Sequelize.col('lastname')), 'fullname']], where: { id: { [Sequelize.Op.ne]: user_id } } })
            return successful(res, 'OK', user)

        } catch (error) { return returnError(res, error) }

    }
}

// schedule tasks to be run on the server
cron.schedule("00 00 23 * *", async () => {
    //cron.schedule("* * * * *", async () => {
    console.log("Running Cron Job");

    const users = await models.user.findAll({
        where: {
            last_login: {
                [models.Sequelize.Op.lte]: moment(Date.now()).subtract(3, 'd').toDate()
            }
        }
    })
    for (var i = 0; i < users.length; i++) {
        const challenge = await models.challenge.findOne({
            include: [
                { model: models.tip },
                { model: models.startup }
            ],
            where: {
                user_id: users[i].dataValues.id,
                status: 'Sin respuesta',
                viewed: 1,
                date_max: {
                    [models.Sequelize.Op.lte]: moment(Date.now()).add(3, 'd').toDate()
                }
            }
        })
        console.log('date max ' + moment(users[i].dataValues.date_max).toDate())
        console.log('hoy ' + moment(Date.now()).toDate())
        var nameComp = null
        if (users[i].dataValues.lastname_2) {
            nameComp = users[i].dataValues.name + ' ' + users[i].dataValues.lastname_1 + ' ' + users[i].dataValues.lastname_2
        } else {
            nameComp = users[i].dataValues.name + ' ' + users[i].dataValues.lastname_1
        }
        var description = null
        if (challenge.startup && moment(users[i].dataValues.date_max).diff(Date.now()) > 0) {
            description = 'Al reto "' + challenge.tip.tip + '" de la startup ' + challenge.startup.name + ' solo le quedan ' + moment(users[i].dataValues.date_max).diff(Date.now(), 'days') + ' días para que lo puedas completar.'
        } else if (challenge.startup && moment(users[i].dataValues.date_max).diff(Date.now()) === 0) {
            description = 'Solo tienes hasta hoy para completar el reto "' + challenge.tip.tip + '" de la startup ' + challenge.startup.name
        } else if (!challenge.startup && moment(users[i].dataValues.date_max).diff(Date.now()) > 0) {
            description = 'Al reto ' + challenge.tip.tip + ' solo le quedan ' + moment(users[i].dataValues.date_max).diff(Date.now()) + ' días para que lo puedas completar.'
        } else if (!challenge.startup && moment(users[i].dataValues.date_max).diff(Date.now()) === 0) {
            description = 'Solo tienes hasta hoy para completar el reto ' + challenge.tip.tip
        } else {
            description = 'Tienes retos por completar.'
        }

        var mailOptions = {
            from: index.emailExitum,
            to: users[i].dataValues.email,
            subject: 'Hemos notado tu ausencia',
            template: 'template',
            context: {
                title: 'Hemos notado tu ausencia',
                name: nameComp,
                text: 'No te olvides de continuar con tus retos',
                description: description,
                url: 'http:\/\/' + '35.175.241.103:5000' + '\/dashboard',
                boton: 'Ir a Exitum'
            }
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: index.emailExitum,
                pass: index.passwordExitum
            }
        });
        var email = users[i].dataValues.email
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("El servidor esta listo para enviar mensajes.");
                const handlebarOptions = {
                    viewEngine: {
                        extName: '.handlebars',
                        partialsDir: './public/images',
                        layoutsDir: './public',
                        defaultLayout: 'template.handlebars',
                    },
                    viewPath: './public',
                    extName: '.handlebars',
                };

                transporter.use('compile', hbs(handlebarOptions));
            }
            transporter.sendMail(mailOptions).then(() => {
                console.log('Un email ha sido enviado a ' + email + '.');
            }).catch(err => {
                console.log("Error: " + err)
            })
        });
    }

    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: index.emailExitum,
    //     pass: index.passwordExitum
    //   }
    // });

    // const mailOptions = {
    //   from: '"John Doe" <john.doe@example.com>', // sender address
    //   to: 'leidy.callupe@tecsup.edu.pe', // list of receivers
    //   subject: 'Hello there!', // Subject line
    //   text: 'A Message from Node Cron App', // plain text body
    //   html: '<b>A Message from Node Cron App</b>' // html body
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   console.log(info.messageId);
    //   if (err) {
    //     console.log(err);
    //   }
    // });
});