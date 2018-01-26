'use strict';
var express = require('express');
var router = express.Router();

//Api
var auth = require('../api/auth.api');

//Middlewares
var authMiddleware = require('../middlewares/auth.middleware');

//Routes
router.post('/login', auth.login);
router.post('/logout', auth.logout);


module.exports = router;