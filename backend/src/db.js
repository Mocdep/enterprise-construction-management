const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'construction_db',
  password: process.env.DB_PASS || 'postgres',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;