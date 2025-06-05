const pool = require('../db');

async function getAllCashflows() {
  const res = await pool.query('SELECT * FROM cashflows');
  return res.rows;
}

async function addCashflow({ amount, type, date, project_id, contract_id }) {
  const res = await pool.query(
    'INSERT INTO cashflows (amount, type, date, project_id, contract_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [amount, type, date, project_id, contract_id]
  );
  return res.rows[0];
}

module.exports = { getAllCashflows, addCashflow };