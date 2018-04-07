const request = require("request");
const ugs = require("ultimate-guitar-scraper");
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

    update: (updateTab,songID, callback) => {
      const queryString = 'Update songs\
        Set name=$1,composer=$2,description=$3,image=$4,lyrics=$5\
        FROM tabs\
        WHERE tabs.song_id = songs.id AND songs.id=$6';
      const values = [
        updateTab.name,
        updateTab.composer,
        updateTab.description,
        updateTab.image,
        updateTab.lyrics,
        songID
      ];

      dbPool.query(queryString, values, (err, queryResult) => {
        const secondQuery = 'Update tabs\
          Set tabnum=$1,arranger=$2,link=$3,youtube=$4\
          FROM songs\
          WHERE tabs.song_id = songs.id AND songs.id=$5';
        const secondValues = [
          updateTab.tabnum,
          updateTab.arranger,
          updateTab.link,
          updateTab.youtube,
          songID
        ];
        dbPool.query(secondQuery, secondValues,(err,queryOutput) => {
          callback(err, queryOutput);
        });  
      });
    },

    create: (newTab,getID, callback) => {
      console.log(newTab);

      const queryString = 'INSERT INTO songs (user_id,name,composer,description,image,lyrics) VALUES ($1,$2,$3,$4,$5,$6) returning id';
      const values = [
        getID,
        newTab.name,
        newTab.composer,
        newTab.description,
        newTab.image,
        newTab.lyrics
      ];

      dbPool.query(queryString, values, (err, queryResult) => {

        const secondQuery = 'INSERT INTO tabs (song_id,user_id,arranger,link,youtube) VALUES (' + queryResult.rows[0].id + ',' + getID + ",'" + newTab.arranger + "','" + newTab.link + "','" + newTab.youtube + "')";

        console.log(secondQuery);

        dbPool.query(secondQuery,(err,queryOutput) => {
          console.log(secondQuery);
          callback(err, queryOutput);
        });  
      });
    },

    search: (input, searchterm, callback) => {
      console.log("search term: " + searchterm);
      const option = input.option;

      if(input.option == "Songsterr"){
        console.log("Retrieving from Songsterr");
        const url = "http://www.songsterr.com/a/ra/songs.json?pattern=" + searchterm;

        request.get(url, (error,response,body) =>{
          if (error) {console.log(error);}
          const json = JSON.parse(body);
          const status = "songsterr";
          let queryResult = json;
          callback(status,queryResult);
        });
      }
      else if(input.option == "Ultimate Guitar"){
        console.log("Retrieving from Ultimate Guitar");
        ugs.search({
          query: searchterm,
          // page: 1,
          type: ['Tab', 'Chords', 'Guitar Pro']
        }, (error, tabs) => {
          if (error){console.log(error);}
          const status = "ultimateGuitar"
          const queryResult = tabs;
          callback(status,queryResult);
        })
      }
      else{
        input.search = "%" + input.search + "%";
        const queryString = 'Select * from songs INNER JOIN tabs on tabs.song_id = songs.id WHERE lower(songs.name) LIKE lower($1) OR lower(songs.composer) LIKE lower($1) OR lower(tabs.arranger) LIKE lower($1)';
        const values = [input.search];
        dbPool.query(queryString,values, (error, queryResult) => {
          console.log(queryResult.rows);
          callback(error,queryResult);
        });
      }
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
