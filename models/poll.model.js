'use strict';
const sequelize = require('../database/config');
const Sequelize = require('sequelize');

const Poll = sequelize.define('poll', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,

}, {
    classMethods: {
      associate: function (models) {
        Poll.hasMany(models.Question);
      }
    }
  });

Poll.sync()
  .then(() => {
    console.log('Creating Polls Table')
  });


module.exports = Poll;