const pool = require('../db');

async function getAllCosts() {
  const res = await pool.query('SELECT * FROM costs');
  return res.rows;
}

async function addCost({ amount, date, project_id, contract_id }) {
  const res = await pool.query(
    'INSERT INTO costs (amount, date, project_id, contract_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [amount, date, project_id, contract_id]
  );
  return res.rows[0];
}

module.exports = { getAllCosts, addCost };