'use strict';
const sequelize = require('../database/config');
const Question = require('./question.model');

const Answer = sequelize.define('answer', {
  description: Sequelize.TEXT
});

Answer.belongsTo(Question);

module.exports = Answer;