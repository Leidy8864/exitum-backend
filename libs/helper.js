const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkeyExitum2019';
const uuid = require('node-uuid');

module.exports = {
    generateAccessData : function(user,res){
        // const expiresIn = 24*60*60;

        const accessToken = jwt.sign({id : user.id},
            SECRET_KEY, {
                // expiresIn : expiresIn
            });

        const accessData = {
            id : user.id,
            email : user.email,
            accessToken : accessToken,
            // expiresIn : expiresIn
        }
        
        return res.status(200).json({status : 200, accessData : accessData});
    },
    generateFileName : function(file){
        var nameFile = uuid.v1({node : [0x01, 0x23, 0x45, 0x67, 0x89, 0xab]}).toString() + file.name;
        
        return nameFile;
    }
}