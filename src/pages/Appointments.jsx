// src/pages/Appointments.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "/login";
}
  const fetchAppointments = async () => {
    const res = await api.get(`/appointments?userId=${user._id}`);
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form:", form);
      const response = await api.post("/appointments", {
  ...form,
  userId: user._id,
});
      console.log("Response:", response.data);
      setForm({ name: "", phone: "", date: "", time: "" });
      fetchAppointments();
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to add appointment: " + (error.response?.data?.message || error.message));
    }
  };

  const sendReminder = (phone, name, date, time) => {
  // ensure India format
  const formattedPhone = phone.startsWith("91") ? phone : "91" + phone;

  const message = `Hi ${name}, this is a reminder for your appointment on ${date} at ${time}. - QuickSlot`;

  const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>📅 Appointment Manager</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Customer Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <button style={{ padding: "10px", cursor: "pointer" }}>
          ➕ Add Appointment
        </button>
      </form>

      {/* LIST */}
      <h2>Appointments List</h2>
      
      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <div style={{ display: "grid", gap: "10px" }}>
          {/* {appointments.map((a) => (
            <div
              key={a._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <strong>{a.name}</strong> ({a.phone}) <br />
              📅 {a.date} ⏰ {a.time}
            </div>
          ))} */}
          {appointments.map((a) => (
  <div
    key={a._id}
    style={{
      border: "1px solid #ddd",
      padding: "10px",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <strong>{a.name}</strong> ({a.phone}) <br />
      📅 {a.date} ⏰ {a.time}
    </div>

    <button
      onClick={() =>
        sendReminder(a.phone, a.name, a.date, a.time)
      }
      style={{
        background: "#25D366",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      💬 WhatsApp
    </button>
  </div>
))}
        </div>
      )}
    </div>
  );
}