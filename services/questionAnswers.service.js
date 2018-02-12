'use strict';

const questionAnswersModel = require('../models').QuestionAnswer;
const randomID = require("random-id");


function saveMany(questions) {
  let id = randomID(10, "A0")
  let getQuestionAnswerId = question => {
    return {
      questionId: question.id,
      answerId: question.answer,
      pollId: question.pollId,
      sessionId: id
    };
  };
  let questionsAnswersArray = questions.map(getQuestionAnswerId);
  return questionAnswersModel.bulkCreate(questionsAnswersArray);
}

function getResponsesByPollId(pollId) {
  return questionAnswersModel.findAll({where: {pollId}});
}



module.exports = {
  saveMany,
  getResponsesByPollId
}