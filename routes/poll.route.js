'use strict';
var express = require('express');
var router = express.Router();

//Api
var poll = require('../api/poll.api');

//Middlewares
var authMiddleware = require('../middlewares/auth.middleware');

//Routes
router.get('/', poll.get);
router.get('/last', poll.getLastPoll);
router.get('/:id', poll.getById);
router.post('/save', poll.save);
router.post('/reply', poll.replyLastPoll);


module.exports = router;