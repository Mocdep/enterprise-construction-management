const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, async (req, res) => {
  const result = await pool.query('SELECT * FROM costs');
  res.json(result.rows);
});

router.post('/', authenticateJWT, async (req, res) => {
  const { amount, date, project_id, contract_id } = req.body;
  const result = await pool.query(
    'INSERT INTO costs (amount, date, project_id, contract_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [amount, date, project_id, contract_id]
  );
  res.json(result.rows[0]);
});

module.exports = router;