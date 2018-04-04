module.exports = (dbPool) => {
	return{
	    editor: (callback) => {
	      	const queryString = "Select * from songs INNER JOIN tabs on tabs.song_id = songs.id";
	        dbPool.query(queryString, (error, queryResult) => {
	          callback(error, queryResult);
	        });
	    }
	}
}