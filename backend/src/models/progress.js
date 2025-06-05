const pool = require('../db');

async function getAllProgress() {
  const res = await pool.query('SELECT * FROM progress');
  return res.rows;
}

async function addProgress({ type, ref_id, status, percent, note }) {
  const res = await pool.query(
    'INSERT INTO progress (type, ref_id, status, percent, note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [type, ref_id, status, percent, note]
  );
  return res.rows[0];
}

module.exports = { getAllProgress, addProgress };