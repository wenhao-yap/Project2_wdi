/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

//Dashboard
const editor = (db) => {
  return (request, response) => {
    if(request.session.username){
    	db.dashboard.editor((error,queryResult) => {
        db.dashboard.getFavourites(request.session,(err2,queryOutput) => {
            let context = {
            songs: queryResult.rows,
            username: request.session.username,
            favourites: queryOutput.rows
          }
          response.render('dashboard',context);
        });
    	});
    }
    else{
      response.render('404');
    }
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