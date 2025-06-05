const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, async (req, res) => {
  const result = await pool.query('SELECT * FROM progress');
  res.json(result.rows);
});

router.post('/', authenticateJWT, async (req, res) => {
  const { type, ref_id, status, percent, note } = req.body;
  const result = await pool.query(
    'INSERT INTO progress (type, ref_id, status, percent, note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [type, ref_id, status, percent, note]
  );
  res.json(result.rows[0]);
});

module.exports = router;