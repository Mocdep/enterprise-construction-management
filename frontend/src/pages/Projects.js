import React, { useEffect, useState } from "react";
import request from "../api/request";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    request.get("/projects").then((res) => setProjects(res.data));
  }, []);

  const addProject = async (e) => {
    e.preventDefault();
    const res = await request.post("/projects", { name, description });
    setProjects([...projects, res.data]);
    setName("");
    setDescription("");
  };

  return (
    <div>
      <h3>Dự án</h3>
      <form onSubmit={addProject}>
        <input
          placeholder="Tên dự án"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Thêm</button>
      </form>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.name} - {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}