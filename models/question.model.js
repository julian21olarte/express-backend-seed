'use strict';

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    description: DataTypes.STRING
  });

  Question.associate = function (models) {
    Question.belongsTo(models.Poll, {
      foreignKey: 'pollId'
    });

    Question.hasMany(models.Answer, {
      foreignKey: 'questionId',
      onDelete: 'cascade',
      hooks: true,
    });

    Question.hasMany(models.QuestionAnswer, {
      foreignKey: 'questionId',
      onDelete: 'cascade',
      hooks: true,
    });

  }

  return Question;
};