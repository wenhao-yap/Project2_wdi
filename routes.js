const users = require('./controllers/user');
const dashboard = require('./controllers/dashboard');
const tabs = require('./controllers/tab');
const charts = require('./controllers/chart')

module.exports = (app,db, request) => {
	/*
	*  =========================================
	*  Users
	*  =========================================
	*/
	//Register
	app.get('/users/register', users.newForm);
	app.post('/users', users.create(db));
	//Login
	app.get('/users/login', users.loginForm);
  	app.post('/users/login', users.login(db));
  	//Log Out
  	app.post('/users/logout', users.logout);
  	/*
	*  =========================================
	*  Dashboard
	*  =========================================
	*/
	//Dashboard
	app.get('/dashboard', dashboard.editor(db));

	/*
	*  =========================================
	*  Songs/Tabs
	*  =========================================
	*/
	//song menu
	app.get('/library', dashboard.library(db));
	//search 
	app.post('/search', tabs.search(db));
	//Edit a current tab
	app.get('/tabs/:id/edit', tabs.updateForm(db));
	app.put('/tabs/:id/edit', tabs.update(db));
	//Create new tab
	app.get('/tabs/new', tabs.createForm);
	app.post('/tabs', tabs.create(db));
	//View tab
	app.get('/tabs/:id', tabs.get(db));
	//Delete a tab
	app.delete('/tabs/:id', tabs.remove(db));
	/*
	*  =========================================
	*  Charts
	*  =========================================
	*/
	app.get('/charts',charts.get);
	/*
	*  =========================================
	*  Favourite
	*  =========================================
	*/
  	// app.get('/users/favourite', users.favourite);
  	app.put('/tabs/:id/favourite', tabs.favourite(db));
};