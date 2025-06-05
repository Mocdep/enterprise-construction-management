import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/customers">Quản lý Khách hàng</Link></li>
        {/* Thêm các link khác */}
      </ul>
    </div>
  );
}