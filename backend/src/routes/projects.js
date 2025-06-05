const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, async (req, res) => {
  const result = await pool.query('SELECT * FROM projects');
  res.json(result.rows);
});

router.post('/', authenticateJWT, async (req, res) => {
  const { name, description } = req.body;
  const result = await pool.query(
    'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  res.json(result.rows[0]);
});

module.exports = router;