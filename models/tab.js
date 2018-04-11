const request = require("request");
const ugs = require("ultimate-guitar-scraper");
/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  return {
    get: (id, session, callback) => {
      const queryString = 'SELECT * from songs INNER JOIN tabs on tabs.song_id = songs.id WHERE songs.id=$1'
      const values = [id];
      dbPool.query(queryString, values, (error, queryResult) => {
        if(session.username){
          console.log("checking is song is favourite");
          const secondQuery = 'SELECT * from favourites where song_id=$1 and user_id=$2'
          const secondValues = [id,session.userID];
          dbPool.query(secondQuery,secondValues,(err,queryOutput) => {
          //if it is favourite
            if(queryOutput.rowCount >= 1){
              queryResult.rows[0].favourite = true;
              console.log("this song is a favourite for " + session.username);
              callback(error, queryResult);
            }
            else{
              // if it is not favourite
              console.log("this song is not a favourite for " + session.username);
              queryResult.rows[0].favourite = false;
              callback(error, queryResult);
            }
          })
        }
        else{
          console.log("not checking if song is favourite as no user is logged in")
          callback(error, queryResult);
        }
      })      
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
      console.log(updateTab.lyrics);

      dbPool.query(queryString, values, (err, queryResult) => {
        const secondQuery = 'Update tabs\
          Set arranger=$1,link=$2,youtube=$3\
          FROM songs\
          WHERE tabs.song_id = songs.id AND songs.id=$4';
        const secondValues = [
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

        dbPool.query(secondQuery,(err,queryOutput) => {
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
          const library = "songsterr";
          let queryResult = json;
          callback(error,library,queryResult);
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
          const library = "ultimateGuitar"
          const queryResult = tabs;
          callback(error,library,queryResult);
        })
      }
      else{
        input.search = "%" + input.search + "%";
        const queryString = 'Select * from songs INNER JOIN tabs on tabs.song_id = songs.id WHERE lower(songs.name) LIKE lower($1) OR lower(songs.composer) LIKE lower($1) OR lower(tabs.arranger) LIKE lower($1)';
        const values = [input.search];
        dbPool.query(queryString,values, (error,queryResult) => {
          const library = "guitartabs"
          callback(error,library, queryResult);
        });
      }
    },

    remove: (id, callback) => {
      const queryString = 'DELETE FROM "public"."tabs" WHERE song_id=$1';
      const values = [id];
      dbPool.query(queryString, values, (error, queryResult) => {
        const secondQuery = 'DELETE FROM "public"."songs" WHERE id=$1';
        dbPool.query(secondQuery,values,(err,queryOutput) => {
          console.log(secondQuery);
          callback(err, queryResult);
        });  
      });
    },

    favourite: (input,callback) => {
      console.log(input);
      const values = [
        input.user_id,
        input.song_id
      ];
      if (input.rating == 1){
        let queryString = 'INSERT INTO favourites(user_id, song_id) VALUES ($1, $2)';
        console.log("inserted");
        console.log(queryString);
         dbPool.query(queryString,values,(err,queryResult) => {
          console.log(queryString);
          console.log(queryResult);
          callback(err, queryResult);
        }); 
      }
      else{
        let queryString = 'DELETE FROM favourites WHERE user_id=$1 AND song_id=$2';
         console.log("deleted");
          dbPool.query(queryString,values,(err,queryResult) => {
            console.log(queryString);
            console.log(queryResult);
            callback(err, queryResult);
        }); 
      }
    } 
  }
};
