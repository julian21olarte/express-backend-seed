'use strict';
const sequelize = require('../database/config');
const Question = require('./question.model');

const Poll = sequelize.define('poll', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,

  });
  
Poll.hasMany(Question);

  module.exports = Poll;