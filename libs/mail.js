var path = require('path');
const index = require('../config/index');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = {

    sendEmail: ({ to, subject, template, cc='' }, context = { } ) => {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: index.emailExitum,
                pass: index.passwordExitum
            }
        });

        transporter.verify(function (error, success) {

            if (error) throw error

            const handlebarOptions = {
                viewEngine: {
                    extName: '.hbs',
                    partialsDir: path.join(__dirname, 'views/partials'),
                    layoutsDir: path.join(__dirname, 'views/layouts'),
                    defaultLayout:false
                },
                viewPath: path.join(__dirname, '../views'),
                extName: '.hbs',
            };

            transporter.use('compile', hbs(handlebarOptions));
            var mailOptions = {
                from: index.emailExitum,
                to: to,
                bcc: cc,
                subject: subject,
                template: template,
                context: context,
            }

            transporter.sendMail(mailOptions)
            .then(() => { })
            .catch(err => { throw err })

        });
        
    }
}