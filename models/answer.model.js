'use strict';

module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    description: DataTypes.STRING
  });  

  Answer.associate = function (models) {
    // Answer.belongsTo(models.Question, {
    //   foreignKey: 'questionId'
    // });

    Answer.hasMany(models.QuestionAnswer, {
      foreignKey: 'answerId',
      onDelete: 'cascade',
      hooks: true,
    });
  }

  return Answer;
};