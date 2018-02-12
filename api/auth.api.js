'use strict';

const authService = require('../services/auth.service');

function login(req, res) {
    if (req.session.user) {
        req.session.user.password = undefined;
        return res.status(200).send(req.session.user);
    }
    else {
        let credentials = req.body;
        authService.login(credentials)
            .then(user => {
                if (user) {
                    req.session.user = user;
                    req.session.save();
                    user.password = undefined;
                    return res.status(200).send(user);
                }
                else {
                    res.status(401).send({ message: 'Unauthenticate' });
                }
            })
            .catch(error => {
                res.status(401).send({ message: 'Unauthenticate' });
            });
    }
}


function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            throw err;
        }
    });
    return res.status(200).send('Logout ok');
}



module.exports = {
    login,
    logout
}