const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkeyExitum2019';
const uuid = require('node-uuid');

module.exports = {
    generateAccessData: function (user, res) {
        // const expiresIn = 24*60*60;

        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            // expiresIn : expiresIn
        });
        
        const accessData = {
            id : user.id,
            name : user.name,
            lastname : user.lastname,
            email : user.email,
            accessToken : accessToken,
            role : user.role,
            confirmed: user.confirmed,
            photo: user.photo
            // expiresIn : expiresIn
        }

        return res.status(200).json({ status: true, message: "Ok", data: accessData });
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
        var nameFile = uuid.v1({ node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab] }).toString() + file.name;

        return nameFile;
    }
}