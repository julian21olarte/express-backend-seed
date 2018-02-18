'use strict';
const questionModel = require('../models').Question;
const answerService = require('../services/answer.service');


function get(id) {
  return questionModel.findOne({ where: { id } });
}


function getByPollId(pollId) {
  return questionModel.findAll({ where: { pollId } })
    .then(questions => {
      if (questions) {
        return Promise.all(questions.map(question => {
          return answerService.getByQuestionId(question.id)
            .then(answers => {
              if (answers) {
                question = question.dataValues;
                question.answers = answers;
                return question;
              }
            });
        }));
      }
    });
}

function saveMany(questions) {
  return Promise.all(questions.map(question => {
    let answers = question.answers;
    return questionModel.create(question)
      .then(newQuestion => answerService.addIdToAnswersArray(answers, newQuestion.id))
      .then(answersArray => {
        return answerService.saveMany(answersArray)
          .then(newAnswers => newAnswers.map(answer => answer.dataValues))
          .then(newAnswers => {
            question.answers = newAnswers;
            return question;
          });
      });
  }));
}

function deleteByPollId(pollId) {
  return questionModel.destroy({where: {pollId}});
}

function addIdToQuestionsArray(questions, id) {
  return questions.map(function (question) {
    question.pollId = id;
    return question;
  });
}


module.exports = {
  get,
  saveMany,
  deleteByPollId,
  addIdToQuestionsArray,
  getByPollId
}