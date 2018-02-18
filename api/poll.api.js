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


function getLastPoll(req, res) {
  pollService.getLast()
  .then(poll => {
    if(poll) {
      res.status(200).send(poll);
    }
    else {
      res.status(404).send('Aun no hay encuestas agregadas');
    }
  })
  .catch(error => {
    res.status(500).send({message: 'Error al intentar obtener la ultima encuesta.', error});
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


function update(req, res) {
  let poll = req.body;
  let id = req.params.id;
  pollService.update(id, poll)
    .then(pollUpdated => {
      if (pollUpdated) {
        res.status(200).send(pollUpdated);
      }
    })
    .catch(error => {
      res.status(500).send({ message: 'Error al editar la encuesta', error });
    });
}


function replyLastPoll(req, res) {
  let lastPoll = req.body;
  pollService.replyLastPoll(lastPoll)
  .then(reply => {
    if(reply) {
      res.status(200).send(reply);
    }
  })
  .catch(error => {
    res.status(500).send({ message: 'Error al contestar la encuesta', error });
  });

}

function getPollResponses(req, res) {
  let id = req.params.id;
  pollService.getPollResponses(id)
  .then(responses => {
    if(responses) {
      res.status(200).send(responses);
    }
  })
  .catch(error => {
    res.status(500).send({ message: 'Error al intentar obtener las respuestas.', error });
  });
}



module.exports = {
  get,
  getById,
  getLastPoll,
  save,
  update,
  replyLastPoll,
  getPollResponses
}