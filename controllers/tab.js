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
        console.log(queryResult.rows[0]);
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

const createForm = (request, response) => {
  response.render('tab/new');
};

const create = (db) => {
  return (request, response) => {
    db.tab.create(request.body, (error, queryResult) => {
      if (queryResult.rowCount >= 1) {
        console.log('Entry added successfully');
        response.redirect('/');
      } else {
        console.log('Entry failed to be added');
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
  get,
  updateForm,
  update,
  createForm,
  create
} 