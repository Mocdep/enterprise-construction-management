import React, { useEffect, useState } from 'react';
import request from '../api/request';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    request.get('/customers').then(res => setCustomers(res.data));
  }, []);

  const addCustomer = async (e) => {
    e.preventDefault();
    const res = await request.post('/customers', { name, type, contact });
    setCustomers([...customers, res.data]);
    setName(''); setType(''); setContact('');
  };

  return (
    <div>
      <h3>Khách hàng</h3>
      <form onSubmit={addCustomer}>
        <input placeholder="Tên" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Loại (buyer/seller)" value={type} onChange={e => setType(e.target.value)} />
        <input placeholder="Liên hệ" value={contact} onChange={e => setContact(e.target.value)} />
        <button type="submit">Thêm</button>
      </form>
      <ul>
        {customers.map(c => (
          <li key={c.id}>{c.name} - {c.type} - {c.contact}</li>
        ))}
      </ul>
    </div>
  );
}