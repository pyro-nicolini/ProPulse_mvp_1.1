const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  database: 'propulse',
  port: 5432,
  allowExitOnIdle: true
})


module.exports = pool;
