const users = require('./controllers/user');

module.exports = (app,db) => {
	app.get('/users/register', users.newForm);
	app.post('/users/register', users.create(db));
	app.get('/users/dashboard', users.dasher);
};