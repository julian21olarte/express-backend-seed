var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || '3000';

//Import routes
var poll = require('./routes/poll.route');
var auth = require('./routes/auth.route');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//Routes
app.use('/auth', auth);
app.use('/poll', poll);


//server
var server = app.listen(port, () => {
  console.log("Server listening on " + port)
});

module.exports = app;
