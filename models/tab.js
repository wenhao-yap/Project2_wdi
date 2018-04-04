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

    update: (updateTab, callback) => {
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
    },

    create: (newTab, callback) => {
      console.log(newTab);

      const queryString = 'INSERT INTO songs (user_id,name,composer,description,image,lyrics) VALUES ($1,$2,$3,$4,$5,$6) returning id';
      const values = [
        newTab.userID,
        newTab.name,
        newTab.composer,
        newTab.description,
        newTab.image,
        newTab.lyrics
      ];

      dbPool.query(queryString, values, (err, queryResult) => {
        const secondQuery = 'INSERT INTO tabs (song_id,user_id,arranger,link) VALUES (' + queryResult.rows[0].id + ',' + newTab.userID + ",'" + newTab.arranger + "','" + newTab.link + "')";

        dbPool.query(secondQuery,(err,queryOutput) => {
          console.log(secondQuery);
          callback(err, queryResult);
        });  
      });
    },

    search: (input, callback) => {
      console.log("search term: " + input.search);
      const queryString = 'Select * from songs INNER JOIN tabs on tabs.song_id = songs.id WHERE lower(songs.name) = lower($1) OR lower(songs.composer) = lower($1) OR lower(tabs.arranger) = lower($1)';
      const values = [input.search];
      dbPool.query(queryString,values, (error, queryResult) => {
        callback(error,queryResult);
      });
    },

    remove: (id, callback) => {
      const queryString = 'DELETE FROM "public"."tabs" WHERE song_id=$1'
      const values = [id];
      dbPool.query(queryString, values, (error, queryResult) => {
        const secondQuery = 'DELETE FROM "public"."songs" WHERE id=$1'
        dbPool.query(secondQuery,values,(err,queryOutput) => {
          console.log(secondQuery);
          callback(err, queryResult);
        });  
      });
    } 
  }
};
