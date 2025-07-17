import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
      <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
      <Link to="/profile" style={{ marginRight: "1rem" }}>Profile</Link>
      <Link to="/messages" style={{ marginRight: "1rem" }}>Messages</Link>
      <Link to="/community" style={{ marginRight: "1rem" }}>Community</Link>
    </nav>
  );
};

export default NavBar;
