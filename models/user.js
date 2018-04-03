const bcrypt = require('bcrypt');

module.exports = (dbPool) => {
	return{
	    create: (user, callback) => {
	      // run user input password through bcrypt to obtain hashed password
	      bcrypt.hash(user.password, 1, (err, hash) => {
	        if (err) console.error('error!', err);
	        // set up query
	        const queryString = `INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}', '${hash}') RETURNING id;`;
	        console.log(queryString);

	        // execute query
	        dbPool.query(queryString, (error, queryResult) => {
	          // invoke callback function with results after query has executed
	          callback(error, queryResult);
	        });
	      });
	    },

	    login: (inputInfo, callback) => {
	      // TODO: Add logic here
	      const queryString = "SELECT password from users WHERE username='" + inputInfo.username + "'";

	      dbPool.query(queryString,(error,queryResult) => {

	        let storePass = queryResult.rows[0].password;
	        // compare between plain text password and stored hashed password
	        bcrypt.compare(inputInfo.password,storePass,(error, response) => {
	            callback(error,response);
	        })
	      })
	    }
	}
}