const bcrypt = require('bcrypt');

module.exports = (dbPool) => {
	return{
		create: (user, callback) => {
	    	bcrypt.hash(user.password, 1, (err, hashed) => {
		        if (err) console.error('error!', err);

		        const queryString = 'INSERT INTO users (email, password) VALUES ($1, $2)';
		        const values = [user.email,hashed];

		        dbPool.query(queryString, values, (error, queryResult) => {
		        	callback(error, queryResult);
		        })
	      	})
	    }
	}
}