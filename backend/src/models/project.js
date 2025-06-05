const pool = require('../db');

async function getAllProjects() {
  const res = await pool.query('SELECT * FROM projects');
  return res.rows;
}

async function addProject({ name, description }) {
  const res = await pool.query(
    'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return res.rows[0];
}

module.exports = { getAllProjects, addProject };