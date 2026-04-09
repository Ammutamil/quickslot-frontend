import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login success");

      // ✅ Redirect
      window.location.href = "/";
    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>⚡ QuickSlot Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}