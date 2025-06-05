import React, { useEffect, useState } from "react";
import request from "../api/request";

export default function Cashflows() {
  const [cashflows, setCashflows] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [contractId, setContractId] = useState("");
  const [projects, setProjects] = useState([]);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    request.get("/cashflows").then((res) => setCashflows(res.data));
    request.get("/projects").then((res) => setProjects(res.data));
    request.get("/contracts").then((res) => setContracts(res.data));
  }, []);

  const addCashflow = async (e) => {
    e.preventDefault();
    const res = await request.post("/cashflows", {
      amount,
      type,
      date,
      project_id: projectId,
      contract_id: contractId,
    });
    setCashflows([...cashflows, res.data]);
    setAmount("");
    setType("");
    setDate("");
    setProjectId("");
    setContractId("");
  };

  return (
    <div>
      <h3>Dòng tiền</h3>
      <form onSubmit={addCashflow}>
        <input
          placeholder="Số tiền"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          placeholder="Loại (thu/chi)"
          value={type}
          onChange={(e) => setType(e.target.value)}
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
        {cashflows.map((r) => (
          <li key={r.id}>
            {r.amount} - {r.type} - {r.date} - Dự án: {r.project_id} - HĐ: {r.contract_id}
          </li>
        ))}
      </ul>
    </div>
  );
}