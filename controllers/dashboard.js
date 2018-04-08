/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

//Dashboard
const editor = (db) => {
  return (request, response) => {
  	db.dashboard.editor((error,queryResult) => {
  		let context = {
  			songs: queryResult.rows,
  			username: request.session.username
  		}
  		response.render('dashboard',context);
  	});
  }
}

const library = (db) => {
  return (request, response) => {
    db.dashboard.editor((error,queryResult) => {
      let context = {
        songs: queryResult.rows,
        username: request.session.username
      }
      response.render('library',context);
    });
  }
}

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  editor,
  library
} 