var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || '3000';

//Import routes
var index = require('./routes/index.route');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//Routes
app.use('/', index);


//server
var server = app.listen(port, () => {
  console.log("Server listening on " + port)
});

module.exports = app;
