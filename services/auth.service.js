'use strict';
const userModel = require('../models/user.model');

function login(credentials) {
    return userModel.findOne({ where: credentials });
}


function logout() {

}


module.exports = {
    login,
    logout
}