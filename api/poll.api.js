'use strict';

const pollService = require('../services/poll.service');
const questionService = require('../services/question.service');
const answerService = require('../services/answer.service');

function get(req, res) {
  pollService.get()
    .then(polls => {
      if (polls) {
        res.status(200).send(polls);
      }
      else {
        res.status(404).send({ message: 'No existen encuestas' });
      }
    })
    .catch(error => {
      res.status(404).send({ message: 'No existen encuestas' });
    });
}


function getById(req, res) {
  let id = req.params.id;
  pollService.getById(id)
    .then(poll => {
      if (poll) {
        res.status(200).send(poll);
      }
    })
    .catch(error => {
      res.status(404).send({ message: 'No existe encuesta con ese id' });
    });
}


function save(req, res) {
  let poll = req.body;
  pollService.save(poll)
    .then(newPoll => {
      if (newPoll) {

        res.status(200).send(newPoll);

      }
    })
    .catch(error => {
      res.status(500).send({ message: 'Error al crear encuesta', error });
    });

}



module.exports = {
  get,
  getById,
  save
}