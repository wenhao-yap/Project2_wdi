const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const db = require('./db');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));

const handlebarsConfig = {
	extname: '.handlebars',
	layoutsDir: 'views',
  defaultLayout: 'layout'
}
app.engine('handlebars', handlebars(handlebarsConfig));
app.set('view engine', 'handlebars');

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.user || null;
  next();
});

/**
 * ===================================
 * Routes
 * ===================================
 */

require('./routes')(app, db);

app.get('/',(request,response) => {
	response.render('home');
})

app.get('*', (request, response) => {
  response.render('404');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});