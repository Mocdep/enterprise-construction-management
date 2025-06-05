import React, { useState } from 'react';
import request from '../api/request';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await request.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch {
      setError('Sai thông tin đăng nhập!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Đăng nhập</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
export default LoginPage;