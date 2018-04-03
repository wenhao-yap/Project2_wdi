const users = require('./controllers/user');

module.exports = (app,db) => {
	/*
	*  =========================================
	*  Users
	*  =========================================
	*/
	//Register
	app.get('/users/register', users.newForm);
	app.post('/users', users.create(db));

	//Authentication
	app.get('/users/login', users.loginForm);
  	app.post('/users/login', users.login(db));

	//Dashboard
	app.get('/users/dashboard', users.dasher);
};