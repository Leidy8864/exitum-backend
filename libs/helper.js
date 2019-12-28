const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkeyExitum2019';
const uuid = require('node-uuid');

module.exports = {

    generateAccessAdmin: function (admin) {

        const accessToken = jwt.sign({ id: admin.id },
            SECRET_KEY, {
            // expiresIn : expiresIn
        });

        return {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            accessToken: accessToken
            // expiresIn : expiresIn
        }
    },

    generateAccessData: function (user, res) {
        const expiresIn = 12*60*60;

        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            expiresIn : expiresIn
        });

        const accessData = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            lastname_1: user.lastname_1,
            lastname_2: user.lastname_2,
            email: user.email,
            accessToken: accessToken,
            role: user.role,
            confirmed: user.confirmed,
            photo: user.photo
            // expiresIn : expiresIn
        }

        return res.status(200).json({ status: true, message: "OK", data: accessData });
    },

    accessData: function (user, res) {
        // const expiresIn = 24*60*60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            // expiresIn : expiresIn
        });
        const accessData = {
            id: user.id,
            email: user.email,
            accessToken: accessToken,
        }
        return res(accessData);
    },

    generateFileName: function (file) {
        var nameFile = uuid.v1({ node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab] }).toString() + Date.now() + '.' + file.name.split('.').pop();
        return nameFile;
    },

    verifyToken: function (req, res, next) {
        // if (!req.headers.authorization) {
        //     return res.status(401).send("Unauthorized request");
        // }
        //let token = req.token.headers.authorization.split(' ')[1]
        let token = req.headers['access-token'];

        if (token === 'null') {
            return res.status(401).send("Unauthorized request");
        }
        let payload = jwt.verify(token, 'secretKey')
        if (!payload) {
            return res.status(401).send("Unauthorized request");
        }
        req.id = payload.subject
        next()
    },
}