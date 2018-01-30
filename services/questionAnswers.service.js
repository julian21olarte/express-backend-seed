'use strict';

const questionAnswersModel = require('../models').QuestionAnswer;


function saveMany(questions) {
  let questionAnswersArray = [];
  questions.map(question => {
    questionAnswersArray.push({
      questionId: question.id,
      answerId: question.answer
    });
  });
  return questionAnswersModel.bulkCreate(questionAnswersArray);
}



module.exports = {
  saveMany
}