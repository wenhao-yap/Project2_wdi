const billboard = require("billboard-top-100").getChart;

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
const get = (request, response) => {
  billboard('hot-100', function(songs, err){
    for (let item of songs){
      let x = item.position['Last Week'];
      let y = item.position['Peak Position'];
      let z = item.position['Wks on Chart'];
      item.lastWk = x;
      item.peak = y;
      item.wksOnChart = z;
    }

    if (err) console.log(err);
    let context = {
      songs: songs
    }
    response.render('chart',context);
  });
}

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  get
} 