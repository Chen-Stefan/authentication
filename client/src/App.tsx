import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./main.css";
import Context from "./pages/Context";
import Register from "./pages/Register";

// Routes就是v5的 Switch
function App() {
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
