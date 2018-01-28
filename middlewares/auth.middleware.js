'use strict';
const usermodel = require('../models').User;

function login(req, res, next) {
    if(req.session.user) {
        return next();
    }
    res.status(401).send('Unauthenticated');
}

module.exports = {
    login
}