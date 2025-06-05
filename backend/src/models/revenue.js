const pool = require('../db');

async function getAllRevenues() {
  const res = await pool.query('SELECT * FROM revenues');
  return res.rows;
}

async function addRevenue({ amount, date, project_id, contract_id }) {
  const res = await pool.query(
    'INSERT INTO revenues (amount, date, project_id, contract_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [amount, date, project_id, contract_id]
  );
  return res.rows[0];
}

module.exports = { getAllRevenues, addRevenue };