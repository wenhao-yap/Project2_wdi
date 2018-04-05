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

    //Validation
    request.checkBody('username', 'Username is required').notEmpty();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('email', 'Email is not valid').isEmail();
    request.checkBody('password', 'Password is required').notEmpty();
    request.checkBody('password2', 'Passwords do not match').equals(request.body.password);

    var errors = request.validationErrors();

    if(errors){
      response.render('user/register',{
        errors:errors
      });
    } else{

      db.user.create(request.body, (error, queryResult) => {
        if (error) {
          response.end('Registration failed! Try again or contact network admin');
        } else {
          request.flash('success_msg', 'You are registered and can now login');
          response.redirect('users/login');
        }

      });
    }
  }
}

//Login
const loginForm = (request, response) => {
  response.render('user/login');
};
const login = (db) => {
  return (request, response) => {
    db.user.login(request.body, (error,queryResult,getID) => {
      if(queryResult == true){
        request.session.username = request.body.username;
        request.session.userID = getID;
        request.flash('success_msg', 'Welcome ' + request.body.username);
        response.redirect('/');
      }
      else{
        request.flash('error_msg', 'Incorrect user or password');
        response.redirect('../users/login')
      }
    })

  };
};
//Logout
const logout = (request,response) => {
  request.flash('success_msg', 'You have logged out');
  request.session.username = undefined;
  response.redirect('/');
}

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  newForm,
  create,
  loginForm,
  login,
  logout
} 