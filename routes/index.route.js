'use strict';
var express = require('express');
var router = express.Router();

//Api
var index = require('../api/index.api');

//Middlewares
var indexMiddleware = require('../middlewares/index.middleware');

//Routes
router.get('/', indexMiddleware.foo, index.foo);


module.exports = router;