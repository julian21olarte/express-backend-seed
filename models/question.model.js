'use strict';
const sequelize = require('../database/config');
const Poll = require('./poll.model');
const Answer = require('./answer.model');

const Question = sequelize.define('question', {
  description: Sequelize.TEXT
});

Question.belongsTo(Poll);
Question.hasMany(Answer);

module.exports = Question;