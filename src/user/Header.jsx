import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header-links">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/table">User Table</NavLink>
      <NavLink to="/register">SignUp</NavLink>
    </div>
  );
}

export default Header;
