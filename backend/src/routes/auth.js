const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Dummy user list
const users = [{ id: 1, username: 'admin', password: 'admin', role: 'admin' }];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Sai thông tin đăng nhập!' });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret');
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

module.exports = router;