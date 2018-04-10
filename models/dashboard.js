module.exports = (dbPool) => {
	return{
	    editor: (callback) => {
	      	const queryString = "Select * from songs INNER JOIN tabs on tabs.song_id = songs.id";
	        dbPool.query(queryString, (error, queryResult) => {
	          callback(error, queryResult);
	        });
	    },

	    getFavourites: (session,callback) =>{
	    	const queryString = 
	    		"SELECT songs.name,songs.composer,songs.id,tabs.arranger FROM ((songs INNER JOIN favourites on favourites.song_id = songs.id) INNER JOIN tabs on tabs.song_id = songs.id) where favourites.user_id=$1"
			values = [session.userID];
			dbPool.query(queryString, values, (error, queryResult) => {
				callback(error,queryResult);
			});
	    }
	}
}