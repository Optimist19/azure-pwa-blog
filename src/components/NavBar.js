import React from "react";
import {  Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nav-bar">
      <header><h1>Navbar</h1></header>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
