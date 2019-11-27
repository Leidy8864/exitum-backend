const index = require('../config/index');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = {

    sendEmail: () => {
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
                    to: 'ronald.miya@tecsup.edu.pe',
                    subject: 'Reunión solicitada',
                    // html: 'Hola,\n\n' + 'Por favor verifique su cuenta haciendo click en: \nhttp:\/\/' + 'localhost:8089' + '\/dashboard\/' + response.accessToken + '\n<img src="cid:unique@rojo"/>',
                    template: 'template-appointment',
                    context: {
                        title: 'Hola',
                        name: 'Ronald' + ' ' + ' Miya',
                        text: 'Notamos que tienes problemas para iniciar sesión.',
                        description: 'Por favor renueva tu contraseña dándole click al botón.',
                        url: 'http:\/\/' + 'localhost:8089' + '\/users\/reset\?token=' + 'prueba osi',
                        boton: 'Recuperar cuenta'
                    },
                }
                transporter.sendMail(mailOptions).then(() => {
                    console.log('Un email de recuperación ha sido enviado a ' +'ronald.miya@tecsup.edu.pe' + '.');
                    res.json({ status: true, message: 'Un email de recuperación ha sido enviado a ' + 'ronald.miya@tecsup.edu.pe' });
                }).catch(err => {
                    console.log("Error: " + err)
                    res.status(500).json({ status: false, message: err.message })
                })
            }
        });
    }
}