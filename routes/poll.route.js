'use strict';
var express = require('express');
var router = express.Router();

//Api
var poll = require('../api/poll.api');

//Middlewares
var authMiddleware = require('../middlewares/auth.middleware');

//Routes
//All users
router.get('/last', poll.getLastPoll);
router.get('/responses/:id', poll.getPollResponses);
router.post('/reply', poll.replyLastPoll);


//Only Admin
router.get('/', authMiddleware.login, poll.get);
router.get('/:id', authMiddleware.login, poll.getById);
router.post('/save', authMiddleware.login, poll.save);



module.exports = router;