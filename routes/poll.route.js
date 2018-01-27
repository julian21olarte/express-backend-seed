'use strict';
var express = require('express');
var router = express.Router();

//Api
var poll = require('../api/poll.api');

//Middlewares
var pollMiddleware = require('../middlewares/poll.middleware');

//Routes
router.get('/', poll.get);
router.get('/:id', poll.getById);
router.post('/save', poll.save);


module.exports = router;