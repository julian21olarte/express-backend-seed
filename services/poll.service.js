'use strict';
const pollModel = require('../models').Poll;
const Question = require('../models').Question;
const questionService = require('../services/question.service');
const questionAnswersService = require('./questionAnswers.service');


function get() {
  return pollModel.findAll();
}

function getById(id) {
  return new Promise((resolve, reject) => {
    pollModel.findOne({ where: { id } }, { include: [{ model: Question, as: 'questions' }] })
      .then(poll => {
        if (poll) {
          questionService.getByPollId(poll.id)
            .then(questions => {
              if (questions) {
                poll = poll.dataValues;
                poll.questions = questions;
                resolve(poll);
              }
            });
        }
      });
  });
}


function save(poll) {
  //return pollModel.create(poll);
  let questions = poll.questions;
  return new Promise((resolve, reject) => {
    pollModel.create(poll)
      .then(newPoll => {
        //add Poll id to all questions in array
        questions = questionService.addIdToQuestionsArray(questions, newPoll.id);
        questionService.saveMany(questions)
          .then((questions) => {
            if (questions) {
              newPoll = newPoll.dataValues;
              newPoll.questions = questions;
              resolve(newPoll);
            }
            else {
              reject(new Error('Error al insertar en la base de datos'));
            }
          });
      });
  });
}

function getLast() {
  return pollModel.findOne({
    where: {},
    order: [['createdAt', 'DESC']],
    attributes: ['id']
  })
    .then(pollId => {
      if (pollId) {
        return getById(pollId.dataValues.id)
        .then(pollLast => {
            return pollLast
            ? pollLast
            : new Error('Error al insertar en la base de datos');
          });
      }
      else {
        return null;
      }
    });
}


function replyLastPoll(lastPoll) {
  let questions = lastPoll.questions;
  return questionAnswersService.saveMany(questions);
}

function getPollResponses(pollId) {
  return questionAnswersService.getResponsesByPollId(pollId);
}


module.exports = {
  get,
  getById,
  getLast,
  save,
  replyLastPoll,
  getPollResponses
}