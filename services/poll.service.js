'use strict';
const pollModel = require('../models').Poll;
const Question = require('../models').Question;
const questionService = require('../services/question.service');
const questionAnswersService = require('./questionAnswers.service');


function get() {
  return pollModel.findAll();
}

function getById(id) {
  return pollModel.findOne({ where: { id } }, { include: [{ model: Question, as: 'questions' }] })
    .then(poll => {
      if (poll) {
        return questionService.getByPollId(poll.id)
          .then(questions => {
            if (questions) {
              poll = poll.dataValues;
              poll.questions = questions;
              return poll;
            }
          });
      }
    });
}

function save(poll) {
  let questions = poll.questions;
  return pollModel.create(poll)
    .then(newPoll => {
      //add Poll id to all questions in array
      questions = questionService.addIdToQuestionsArray(questions, newPoll.id);
      return questionService.saveMany(questions)
        .then((questions) => {
          if (questions) {
            newPoll = newPoll.dataValues;
            newPoll.questions = questions;
            return newPoll
          }
          else {
            return (new Error('Error al insertar en la base de datos'));
          }
        });
    });
}

function update(id, poll) {
  return deleteById(id)
    .then(response => {
      console.log('Elimina la encuesta');
      console.log(response);
      return save(poll);
    });
}

function deleteById(id) {
  return pollModel.destroy({ where: { id } });
}

// function update(id, poll) {
//   let questions = poll.questions;
//   return pollModel.update(poll, { where: { id } })
//     .then(pollUpdated => {
//       questions = questionService.addIdToQuestionsArray(questions, newPoll.id);
//       return questionService.deleteByPollId(id)
//         .then(questionsDeleted => {
//           if (questionsDeleted === questions.length) {
//             return questionService.updateMany(questions)
//               .then((questions) => {
//                 if (questions) {
//                   pollUpdated = pollUpdated.dataValues;
//                   pollUpdated.questions = questions;
//                   return pollUpdated
//                 }
//                 else {
//                   return (new Error('Error al insertar en la base de datos'));
//                 }
//               });
//           }
//         });
//     });
//   // let questions = poll.questions;
//   // return pollModel.create(poll)
//   //   .then(newPoll => {
//   //     //add Poll id to all questions in array
//   //     questions = questionService.addIdToQuestionsArray(questions, newPoll.id);
//   //     return questionService.saveMany(questions)
//   //       .then((questions) => {
//   //         if (questions) {
//   //           newPoll = newPoll.dataValues;
//   //           newPoll.questions = questions;
//   //           return newPoll
//   //         }
//   //         else {
//   //           return (new Error('Error al insertar en la base de datos'));
//   //         }
//   //       });
//   //   });
// }

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
  update,
  replyLastPoll,
  getPollResponses
}