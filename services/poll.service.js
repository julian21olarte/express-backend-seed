'use strict';
const pollModel = require('../models/poll.model');

function get() {
    return pollModel.findAll();
}


function save(poll) {
    return pollModel.create(poll);
}