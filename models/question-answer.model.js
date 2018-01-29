'use strict';

module.exports = (sequelize, DataTypes) => {
  const QuestionAnswer = sequelize.define('QuestionAnswer');

  QuestionAnswer.associate = function (models) {
    QuestionAnswer.belongsTo(models.Question, {
      foreignKey: 'questionId'
    });
    QuestionAnswer.belongsTo(models.Answer, {
      foreignKey: 'answerId'
    });
  }

  return QuestionAnswer;
};