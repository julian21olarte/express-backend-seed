'use strict';

module.exports = (sequelize, DataTypes) => {
  const QuestionAnswer = sequelize.define('QuestionAnswer', {
    sessionId: DataTypes.STRING
  });

  QuestionAnswer.associate = function (models) {
    QuestionAnswer.belongsTo(models.Question, {
      foreignKey: 'questionId'
    });

    QuestionAnswer.belongsTo(models.Answer, {
      foreignKey: 'answerId'
    });

    QuestionAnswer.belongsTo(models.Poll, {
      foreignKey: 'pollId'
    });
  }

  return QuestionAnswer;
};