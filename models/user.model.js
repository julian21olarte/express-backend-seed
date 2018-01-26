'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    username: 'granactate',
    password: 'granactate',
    role: 'ADMIN'
  });
});

module.exports = User;