const pool = require('../db');

async function getAllCustomers() {
  const res = await pool.query('SELECT * FROM customers');
  return res.rows;
}

async function addCustomer({ name, type, contact }) {
  const res = await pool.query(
    'INSERT INTO customers (name, type, contact) VALUES ($1, $2, $3) RETURNING *',
    [name, type, contact]
  );
  return res.rows[0];
}

module.exports = { getAllCustomers, addCustomer };