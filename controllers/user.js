/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

const newForm = (request, response) => {
  response.render('user/register');
}

const create = (db) => {
  return (request, response) => {
    db.userDB.create(request.body, (error, queryResult) => {
      if (error) {
        response.end('Registration failed! Try again or contact network admin');
      } else {
        response.cookie('loggedIn', true);
        response.cookie('userName', request.body.name);
        response.cookie('userId', queryResult);
        response.redirect('/');
      }
    });
  }
}

const dasher = (request,response) => {
  response.render('user/dashboard');
}

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  newForm,
  create,
  dasher
} 