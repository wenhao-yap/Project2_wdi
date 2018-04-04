const pg = require('pg');
const user = require('./models/user');
const dashboard = require('./models/dashboard');
const tab = require('./models/tab');

const configs = {
  host: 'localhost',
  database: 'wdi2',
  port: 5432
};

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
