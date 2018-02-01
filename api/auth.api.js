'use strict';

const authService = require('../services/auth.service');

function login(req, res) {
    if(req.session.user) {
        console.log('ya existe un usuario');
        return res.status(200).send({user: req.session.user});
    }
    console.log('No existe un usuario');
    let credentials = req.body;
    authService.login(credentials)
    .then(user => {
        if(user) {
            req.session.user = user;
            req.session.save();
            res.status(200).send(user);
        }
        else {
            res.status(401).send({message: 'Unauthenticate'});
        }
    })
    .catch(error => {
        res.status(401).send({message: 'Unauthenticate'});
    }); 
}


function logout(req, res) {
    req.session.destroy(err => {
        if(err) {
            throw err;
        }
        return res.status(200).send('Logout ok');
    });
}



module.exports = {
    login,
    logout
}