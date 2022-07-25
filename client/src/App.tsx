import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./main.css";
import Context, { myContext } from "./pages/Context";
import Register from "./pages/Register";

// Routes就是v5的 Switch
function App() {
  const ctx = useContext(myContext);

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          {ctx ? (
            <>
              {ctx.isAdmin ? (
                <Route path="/admin" element={<AdminPage />}></Route>
              ) : null}
              <Route path="/profile" element={<Profile />}></Route>
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </>
          )}
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
