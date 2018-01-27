'use strict';

module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  return Poll;
};