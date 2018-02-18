'use strict';

module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Poll.associate = function (models) {
    Poll.hasMany(models.Question, {
      foreignKey: 'pollId',
      onDelete: 'cascade',
      hooks: true
    });

    Poll.hasMany(models.QuestionAnswer, {
      foreignKey: 'pollId',
      onDelete: 'cascade',
      hooks: true,
    });
  }

  return Poll;
};