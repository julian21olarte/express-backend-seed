var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var models = require('./models');
var port = process.env.PORT || '3000';

//Import routes
var poll = require('./routes/poll.route');
var auth = require('./routes/auth.route');

var app = express();
app.use(session({
  secret: 'julian21olarte',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//Routes
app.use('/auth', auth);
app.use('/poll', poll);


models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  app.listen(port, () => {
    console.log("Server listening on " + port)
  });
});

module.exports = app;
