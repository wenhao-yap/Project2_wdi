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
  			songs: queryResult.rows
  		}
  		response.render('dashboard',context);
  	});
  }
}

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  editor
} 