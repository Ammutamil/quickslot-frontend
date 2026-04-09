import { useState } from "react";
import api from "../services/api";

export default function Admin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleCreate = async () => {
    await api.post("/admin/create-user", {
      ...form,
      role: "admin", // 👈 required for now
    });

    alert("User created!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Clinic User</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleCreate}>Create User</button>
    </div>
  );
}