'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('polls_test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    module.exports = sequelize;