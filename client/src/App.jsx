import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Register from "./Components/User/Register";
import { Toaster } from "react-hot-toast";
import Login from "./Components/User/Login";
import CustomerDashboard from "./Components/Dashboard/Customer/CustomerDashboard";
import SupportDashboard from "./Components/Dashboard/Support/SupportDashboard";
function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #22d3ee",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/support" element={<SupportDashboard />} />
      </Routes>
    </>
  );
}

export default App;
