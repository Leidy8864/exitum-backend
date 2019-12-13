const fs = require ('fs'); 
const text = require('../libs/text')
const jwt = require('jsonwebtoken')
const moment = require("moment")
const config = require("../config/index")
const publicKEY  = fs.readFileSync(__dirname+'./../key/publicKey.key', 'utf8');
const privateKEY  = fs.readFileSync(__dirname+'./../key/privateKey.key', 'utf8');

function createToken (user) 
{
    const payload = {
        sub : user.id,
        email: user.email
    }

    const signOptions = {
        // issuer:  i,
        // subject:  s,
        // audience:  a,
        expiresIn:  "5m",
        algorithm:  "RS256"
    };

    const token = jwt.sign(payload, privateKEY, signOptions);

    return token
}

function verifyToken(token) 
{
    const verifyOptions  = {
        // issuer:  i,
        // subject:  s,
        // audience:  a,
        expiresIn:  "5m",
        algorithm:  "RS256"
    };

    const decoded =  new Promise((resolve, reject) => {
        try 
        {
            const payload = jwt.verify(token, publicKEY, verifyOptions);
            resolve( payload.sub )
        } 
        catch (error)
        {
            reject( error.message )
        }
    })
    
    return decoded
    
}

module.exports = {
    createToken,
    verifyToken
}