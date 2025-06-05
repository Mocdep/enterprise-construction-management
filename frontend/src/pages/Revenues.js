import React, { useEffect, useState } from "react";
import request from "../api/request";

export default function Revenues() {
  const [revenues, setRevenues] = useState([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [contractId, setContractId] = useState("");
  const [projects, setProjects] = useState([]);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    request.get("/revenues").then((res) => setRevenues(res.data));
    request.get("/projects").then((res) => setProjects(res.data));
    request.get("/contracts").then((res) => setContracts(res.data));
  }, []);

  const addRevenue = async (e) => {
    e.preventDefault();
    const res = await request.post("/revenues", {
      amount,
      date,
      project_id: projectId,
      contract_id: contractId,
    });
    setRevenues([...revenues, res.data]);
    setAmount("");
    setDate("");
    setProjectId("");
    setContractId("");
  };

  return (
    <div>
      <h3>Doanh thu</h3>
      <form onSubmit={addRevenue}>
        <input
          placeholder="Số tiền"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Chọn dự án</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
        >
          <option value="">Chọn hợp đồng</option>
          {contracts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}
            </option>
          ))}
        </select>
        <button type="submit">Thêm</button>
      </form>
      <ul>
        {revenues.map((r) => (
          <li key={r.id}>
            {r.amount} - {r.date} - Dự án: {r.project_id} - HĐ: {r.contract_id}
          </li>
        ))}
      </ul>
    </div>
  );
}