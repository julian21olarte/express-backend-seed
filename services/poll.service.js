'use strict';
const pollModel = require('../models/poll.model');
const userModel = require('../models/user.model');
const answerModel = require('../models/answer.model');
const questionModel = require('../models/question.model');

function get() {
    return pollModel.findAll();
}


function save(poll) {
    return pollModel.create(poll);
}