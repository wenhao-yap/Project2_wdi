const pg = require('pg');
const user = require('./models/user');

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
  user: user(pool)
};
