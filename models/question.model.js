'use strict';

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    description: DataTypes.STRING
  });

  Question.associate = function (models) {
    Question.belongsTo(models.Poll, {
      foreignKey: 'pollId'
    });
  }

  return Question;
};