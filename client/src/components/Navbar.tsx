import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../pages/Context";

export default function Navbar() {
  const ctx = useContext(myContext);
  return (
    <div className="NavContainer">
      {ctx ? (
        <>
          <Link to="/logout">Logout</Link>
          {ctx.isAdmin ? (<Link to="/admin">Admin</Link>) : null}
          
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
