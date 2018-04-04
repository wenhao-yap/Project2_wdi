/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
const get = (db) => {
  return (request, response) => {
    db.tab.get(request.params.id, (error, queryResult) => {
      if (error) {
        console.error('Error getting tabs', error);
        response.sendStatus(500);
      } else {
        let context = {
          tab: queryResult.rows[0]
        }
        response.render('tab/tab',context);
      }
    });
  };
};

const updateForm = (db) => {
  return (request, response) => {
    db.tab.get(request.params.id, (error,queryResult) => {
      if(error){
        console.error("can't get form", error);
      }
      else{
        let context = {
          tab: queryResult.rows[0]
        }
        response.render('tab/edit',context);
      }
    })
  };
};

const update = (db) => {
  return (request, response) => {
    db.tab.update(request.body, (error,queryResult) => {
      response.redirect('/tabs/' + request.params.id);
    })
  };
};

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  get,
  updateForm,
  update
} 