'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const Answer = sequelize.define('answer', {
  description: Sequelize.STRING
}, {
    classMethods: {
      associate: function (models) {
        Answer.belongsTo(models.Question);
      }
    }
  }
);

Answer.sync()
  .then(() => {
    console.log('Creating Answers Table');
  });

module.exports = Answer;