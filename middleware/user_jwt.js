const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = async function(req, res, next) {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }

    try {
        await jwt.verify(token, config.jwtUserSecret, (err, decoded) => {
            if(err) {
                res.status(401).json({
                    msg: 'Token not valid'
                });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch(err) {
        console.log('Something wend wrong with middleware ' + err);
        res.json(500).json({
            msg: 'Server error'
        });
    }
}