var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var models = require('./models');
var port = process.env.PORT || '3000';
var cors = require('cors');

//Import routes
var poll = require('./routes/poll.route');
var auth = require('./routes/auth.route');

var app = express();
app.use(session({
  secret: 'julian21olarte',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* CORS */
app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-Key, Origin, X-Request-With, Content-type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


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
