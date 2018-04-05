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
        console.log('Retrieved tab for song ' + queryResult.rows[0].name);
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
    db.tab.create(request.body,request.session.userID,(error, queryResult) => {
      if (queryResult.rowCount >= 1) {
        console.log('Entry added successfully');
        response.redirect('/dashboard');
      } else {
        console.log('Entry failed to be added');
      }
    })
  };
};

const search = (db) => {
  return (request, response) => {
    console.log(request.body);
    const searchterm = request.body.search;
    db.tab.search(request.body, searchterm, (error, queryResult) => {
      if (queryResult.rowCount >= 1) {
        let context = {
          searchResult: queryResult.rows,
          failSearch: false,
          searchTerm: searchterm
        }
        response.render('tab/search',context);       
      } else if(error == "songsterr"){
        let context = {
          searchResult: queryResult,
          failSearch: false,
          searchTerm: searchterm,
          songsterr: true
        }
        response.render('tab/search',context); 
      }
      else if(error == "ultimateGuitar"){
        let context = {
          searchResult: queryResult,
          failSearch: false,
          searchTerm: searchterm,
          ultimateGuitar: true
        }
        response.render('tab/search',context); 
      }
      else{
        let context = {
          failSearch: true
        }
        response.render('tab/search',context);
      }
    })
  };
};

const remove = (db) => {
  return (request, response) => {
    db.tab.remove(request.params.id, (error, queryResult) => {
      if (error) {
        console.error('Failed to delete', error);
        response.sendStatus(500);
      } else {
        let context = {
          tab: queryResult.rows[0]
        }
        console.log('Successfully tab deletion');
        response.redirect('/dashboard');
      }
    });
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
  create,
  search,
  remove
} 