'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  });


  User.initialize = function () {
    let admin = {
      username: 'granactate',
      password: 'granactate',
      role: 'ADMIN'
    };
    User.sync()
      .then(() => {
        User.findOne({ where: admin })
        .then(user => {
          if (!user) {
            console.log('Inserting admin in databases');
            User.create(admin);
          }
        });
      });
    console.log('LOADING User model');
  }

  return User;
};
