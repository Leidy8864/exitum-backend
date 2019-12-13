const fs = require ('fs'); 
const path = require('path');
const jwt = require('jsonwebtoken')
const publicKEY  = fs.readFileSync(path.join(__dirname, '/../key/publicKey.key'), 'utf8');
const privateKEY  = fs.readFileSync(path.join(__dirname, '/../key/privateKey.key'), 'utf8');

function createToken (user) 
{
    const payload = {
        sub : user.id
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