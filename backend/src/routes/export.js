const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const pool = require('../db');
const authenticateJWT = require('../middleware/auth');

router.get('/revenue-cost', authenticateJWT, async (req, res) => {
  const revenues = await pool.query('SELECT * FROM revenues');
  const costs = await pool.query('SELECT * FROM costs');
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Doanh thu & Chi phí');
  sheet.addRow(['Loại', 'Số tiền', 'Ngày', 'Dự án', 'Hợp đồng']);
  revenues.rows.forEach(r => sheet.addRow(['Doanh thu', r.amount, r.date, r.project_id, r.contract_id]));
  costs.rows.forEach(c => sheet.addRow(['Chi phí', c.amount, c.date, c.project_id, c.contract_id]));
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="revenue-cost.xlsx"');
  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;