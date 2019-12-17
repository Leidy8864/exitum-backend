const jwt = require('jsonwebtoken') 
const text = require('../libs/text')
const config = require('../config/index');
const { verifyToken } = require('../service/service')

function isAuth (req, res, next) {

    var token = req.headers['exitum-auth'];
    
    if (!token) 
        return res.status(401).json({ status: false, message: text.tokenNotProvided, data: {  } });
    
    verifyToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(error => {
            return res.status(403).json({ status: false, message: error, data: {  } })
        })

}

module.exports = isAuth;