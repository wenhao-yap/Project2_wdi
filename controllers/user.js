/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

//Register
const newForm = (request, response) => {
  response.render('user/register');
}
const create = (db) => {
  return (request, response) => {
    db.user.create(request.body, (error, queryResult) => {
      if (error) {
        response.end('Registration failed! Try again or contact network admin');
      } else {
        console.log('User created successfully');
        response.cookie('loggedIn', true);
        response.cookie('username', request.body.username);
        response.redirect('/');
      }
    });
  }
}

//Login
const loginForm = (request, response) => {
  response.render('user/login');
};
const login = (db) => {
  return (request, response) => {
    db.user.login(request.body, (error,queryResult) => {
      if(queryResult == true){
        response.cookie('loggedIn',true);
        response.cookie('username',request.body.username);
        response.redirect('/');
      }
      else{
        response.send("no such user");
      }
    })

  };
};

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  newForm,
  create,
  loginForm,
  login
} 