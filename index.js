const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const db = require('./db');


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
	layoutsDir: 'views'
}
app.engine('handlebars', handlebars(handlebarsConfig));
app.set('view engine', 'handlebars');

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