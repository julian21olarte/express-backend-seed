'use strict';
const pollModel = require('../models').Poll;
const Question = require('../models').Question;
const questionService = require('../services/question.service');


function get() {
  return pollModel.findAll();
}

function getById(id) {

  return new Promise((resolve, reject) => {
    pollModel.findOne({ where: { id } }, { include: [{ model: Question, as: 'questions_max' }] })
      .then(poll => {
        if (poll) {
          questionService.getByPollId(poll.id)
            .then(questions => {
              if (questions) {
                poll = poll.dataValues;
                poll.questions = questions;
                console.log(poll);
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
  console.log('entra');
  return new Promise((resolve, reject) => {
    console.log('entra a promise');
    pollModel.create(poll)
      .then(newPoll => {
        console.log('entra a then');
        //add Poll id to all questions in array
        questions = questionService.addIdToQuestionsArray(questions, newPoll.id);
        questionService.saveMany(questions)
          .then((questions) => {
            if (questions) {
              console.log('ESTAS SON LAS QUESTIONS: ');
              console.log(questions);
              newPoll = newPoll.dataValues;
              newPoll.questions = questions;
              console.log(newPoll);
              resolve(newPoll);
            }
            else {
              reject(new Error('Error al insertar en la base de datos'));
            }
          });
      });
  });
}


module.exports = {
  get,
  getById,
  save
}