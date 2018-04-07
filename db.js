const pg = require('pg');
const user = require('./models/user');
const dashboard = require('./models/dashboard');
const tab = require('./models/tab');

/**
 * ===================================
 * Heroku deployment
 * ===================================
 */
const url = require('url');

//check to see if we have this heroku environment variable
if( process.env.DATABASE_URL ){

  //we need to take apart the url so we can set the appropriate configs

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{

  //otherwise we are on the local network
  var configs = {
      host: '127.0.0.1',
      database: 'wdi2',
      port: 5432
  };
}

const pool = new pg.Pool(configs);

pool.on('error', (err) => {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  pool: pool,
  user: user(pool),
  dashboard: dashboard(pool),
  tab: tab(pool)
};
