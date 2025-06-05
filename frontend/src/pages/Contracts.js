import React, { useEffect, useState } from "react";
import request from "../api/request";

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [code, setCode] = useState("");
  const [projectId, setProjectId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    request.get("/contracts").then((res) => setContracts(res.data));
    request.get("/projects").then((res) => setProjects(res.data));
    request.get("/customers").then((res) => setCustomers(res.data));
  }, []);

  const addContract = async (e) => {
    e.preventDefault();
    const res = await request.post("/contracts", {
      code,
      project_id: projectId,
      customer_id: customerId,
    });
    setContracts([...contracts, res.data]);
    setCode("");
    setProjectId("");
    setCustomerId("");
  };

  return (
    <div>
      <h3>Hợp đồng</h3>
      <form onSubmit={addContract}>
        <input
          placeholder="Mã hợp đồng"
          value={code}
          onChange={(e) => setCode(e.target.value)}
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
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="">Chọn khách hàng</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">Thêm</button>
      </form>
      <ul>
        {contracts.map((c) => (
          <li key={c.id}>
            {c.code} - Dự án: {c.project_id} - KH: {c.customer_id}
          </li>
        ))}
      </ul>
    </div>
  );
}