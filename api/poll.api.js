'use strict';

const pollService = require('../services/poll.service');

function get(req, res) {
    pollService.get()
    .then(polls => {
        if(polls) {
            res.status(200).send(polls);
        }
        else {
            res.status(404).send({message: 'No existen encuestas'});
        }
    })
    .catch(error => {
        res.status(404).send({message: 'No existen encuestas'});
    });
}


function save(req, res) {
    let poll = req.bodt.poll;
    pollService.save(poll)
    .then(newPoll => {
        res.status(200).send(newPoll);
    })
    .catch(error => {
        res.status(500).send({message: 'Error al crear encuesta'});
    });

}



module.exports = {
    get,
    save
}