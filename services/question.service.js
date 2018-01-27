'use strict';
const questionModel = require('../models').Question;
const answerService = require('../services/answer.service');


function get(id) {
  return questionModel.findOne({ where: { id } });
}


function getByPollId(pollId) {

  return new Promise((resolve, reject) => {
    questionModel.findAll({ where: { pollId } })
      .then(questions => {
        if (questions) {
          Promise.all(questions.map(question => {
            return new Promise((resolve, reject) => {
              answerService.getByQuestionId(question.id)
                .then(answers => {
                  if (answers) {
                    question = question.dataValues;
                    question.answers = answers;
                    resolve(question);
                  }
                });
            });
          }))
            .then(questions => {
              if(questions) {
                resolve(questions);
              }
            });
        }
      });
  });
}


function saveMany(questions) {
  //return questionModel.bulkCreate(questions);
  return Promise.all(questions.map(question => {
    return new Promise((resolve, reject) => {
      let answers = question.answers;
      questionModel.create(question)
        .then(newQuestion => {
          answers = answerService.addIdToAnswersArray(answers, newQuestion.id);
          //console.log(answers);
          answerService.saveMany(answers)
            .then(newAnswers => newAnswers.map(answer => answer.dataValues))
            .then(newAnswers => {
              question.answers = newAnswers;
              console.log('AGREGANDO ANSWERS A QUESTIONS');
              resolve(question);
            });
        });
    });
  }));
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
  addIdToQuestionsArray,
  getByPollId
}