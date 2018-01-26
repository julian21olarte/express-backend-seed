'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const Question = sequelize.define('question', {
  description: Sequelize.STRING
}, {
    classMethods: {
      associate: function (models) {
        Question.belongsTo(models.Poll);
        Question.hasMany(models.Answer);
      }
    }
  });

Question.sync()
  .then(() => {
    console.log('Creating Questions Table')
  });

module.exports = Question;