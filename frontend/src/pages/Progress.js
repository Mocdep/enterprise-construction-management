import React, { useEffect, useState } from "react";
import request from "../api/request";

export default function Progress() {
  const [progresses, setProgresses] = useState([]);
  const [type, setType] = useState("");
  const [refId, setRefId] = useState("");
  const [status, setStatus] = useState("");
  const [percent, setPercent] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    request.get("/progress").then((res) => setProgresses(res.data));
  }, []);

  const addProgress = async (e) => {
    e.preventDefault();
    const res = await request.post("/progress", {
      type,
      ref_id: refId,
      status,
      percent,
      note,
    });
    setProgresses([...progresses, res.data]);
    setType("");
    setRefId("");
    setStatus("");
    setPercent("");
    setNote("");
  };

  return (
    <div>
      <h3>Tiến độ</h3>
      <form onSubmit={addProgress}>
        <input
          placeholder="Loại (project/contract)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          placeholder="ID tham chiếu"
          value={refId}
          onChange={(e) => setRefId(e.target.value)}
        />
        <input
          placeholder="Trạng thái"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          placeholder="Phần trăm"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />
        <input
          placeholder="Ghi chú"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Thêm</button>
      </form>
      <ul>
        {progresses.map((p) => (
          <li key={p.id}>
            {p.type} - {p.ref_id} - {p.status} - {p.percent}% - {p.note}
          </li>
        ))}
      </ul>
    </div>
  );
}