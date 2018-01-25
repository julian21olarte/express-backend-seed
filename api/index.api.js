'use strict';

function foo(req, res) {
    res.status(200).send({message: 'Ok'});
}



module.exports = {
    foo
}