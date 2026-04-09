// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
           <Route path="/login" element={<Login />} />
        <Route path="/" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;