const pool = require('../db');

async function getAllContracts() {
  const res = await pool.query('SELECT * FROM contracts');
  return res.rows;
}

async function addContract({ code, project_id, customer_id }) {
  const res = await pool.query(
    'INSERT INTO contracts (code, project_id, customer_id) VALUES ($1, $2, $3) RETURNING *',
    [code, project_id, customer_id]
  );
  return res.rows[0];
}

module.exports = { getAllContracts, addContract };