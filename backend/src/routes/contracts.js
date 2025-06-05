const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, async (req, res) => {
  const result = await pool.query('SELECT * FROM contracts');
  res.json(result.rows);
});

router.post('/', authenticateJWT, async (req, res) => {
  const { code, project_id, customer_id } = req.body;
  const result = await pool.query(
    'INSERT INTO contracts (code, project_id, customer_id) VALUES ($1, $2, $3) RETURNING *',
    [code, project_id, customer_id]
  );
  res.json(result.rows[0]);
});

module.exports = router;