const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, async (req, res) => {
  const tables = ['customers', 'projects', 'contracts', 'revenues', 'costs', 'cashflows', 'progress'];
  const backup = {};
  for (const t of tables) {
    const data = await pool.query(`SELECT * FROM ${t}`);
    backup[t] = data.rows;
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="backup.json"');
  res.send(JSON.stringify(backup, null, 2));
});

module.exports = router;