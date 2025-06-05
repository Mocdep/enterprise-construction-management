const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, async (req, res) => {
  const result = await pool.query('SELECT * FROM customers');
  res.json(result.rows);
});

router.post('/', authenticateJWT, async (req, res) => {
  const { name, type, contact } = req.body;
  const result = await pool.query(
    'INSERT INTO customers (name, type, contact) VALUES ($1, $2, $3) RETURNING *',
    [name, type, contact]
  );
  res.json(result.rows[0]);
});

module.exports = router;