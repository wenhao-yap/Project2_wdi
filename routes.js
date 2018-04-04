const users = require('./controllers/user');
const dashboard = require('./controllers/dashboard');
const tabs = require('./controllers/tab');

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
	//search 
	app.post('/search', tabs.search(db));
	//songs list
	//open song menu to see tabs
	//Edit a current tab
	app.get('/tabs/:id/edit', tabs.updateForm(db));
	app.put('/tabs/:id/edit', tabs.update(db));
	//Create new tab
	app.get('/tabs/new', tabs.createForm);
	app.post('/tabs', tabs.create(db));
	//View tab
	app.get('/tabs/:id', tabs.get(db));
	//Delete a tab
};