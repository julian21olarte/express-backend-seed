'use strict';

module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    description: DataTypes.STRING
  });  

  Answer.associate = function (models) {
    Answer.belongsTo(models.Question, {
      foreignKey: 'questionId'
    });
  }

  return Answer;
};