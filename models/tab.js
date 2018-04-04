/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  return {
    get: (id, callback) => {
      const values = [id];
      dbPool.query('SELECT * from songs INNER JOIN tabs on tabs.song_id = songs.id WHERE songs.id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    },

    update: (updateTab, callback) =>{
      const queryString = 'Update songs Set name=$1,composer=$2,description=$3,image=$4,lyrics=$5 WHERE (name=$1)';
      const values = [
        updateTab.name,
        updateTab.composer,
        updateTab.description,
        updateTab.image,
        updateTab.lyrics
      ];

      dbPool.query(queryString, values, (err, queryResult) => {
        const secondQuery = 'Update tabs Set tabnum=$1,arranger=$2,link=$3 WHERE (tabnum=$1)';
        const secondValues = [
        	updateTab.tabnum,
	        updateTab.arranger,
	        updateTab.link
	    ];
        dbPool.query(secondQuery, secondValues,(err,queryOutput) => {
          callback(err, queryResult);
        });  
      });
    }
  }
};
