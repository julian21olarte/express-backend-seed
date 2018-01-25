'use strict';

function foo(req, res, next) {
    next();
}

module.exports = {
    foo
}