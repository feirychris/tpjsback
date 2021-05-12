const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            console.log(payload)
            if (error) {
                res.status(403);
                res.json({
                    message: 'Accès interdit : token invalide.'
                });
            } else {
                next();
            }
        })

    } else {
        res.status(403);
        res.json({
            message: 'Accès interdit : token manquant.'
        });
    }
}

exports.verifyRoleAdmin = (req, res, next) => {
    let token = req.headers['authorization'];
 
    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            // Check role admin via le token 
            if (payload.user.role == "admin") {
                next();
            } else {
                res.status(403);
                res.json({
                    message: 'Access denied sorry you are not an admin'
                });
            }
        })
 
    } else {
        res.status(403);
        res.json({
            message: 'Accès interdit : token manquant.'
        });
    }
}
 
exports.verifyRoleUser = (req, res, next) => {
    let token = req.headers['authorization'];
 
    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            // Check role admin et user via le token
            //console.log(payload.user.role)
            if (payload.user.role == "admin" || payload.user.role == "user") {
                next();
            } else {
                res.status(403);
                res.json({
                    message: 'Access denied sorry you are not a user'
                });
            }
        })
 
    } else {
        res.status(403);
        res.json({
            message: 'Accès interdit : token manquant.'
        });
    }
}