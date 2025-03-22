import React from "react";
import { Link } from "react-router-dom";
import "./style/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-heading">Rabbitt.AI</h1>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/calculate">Calculate</Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/object-detection">Object Detection</Link>
        </li>
        <li className="nav-item">
          <Link to="/specific-info">Specific info</Link>
        </li>
        <li className="nav-item">
          <Link to="/description">Description of product</Link>
        </li> */}
      </ul>
      <h1 className="team-name"> Techies  </h1> {/* Moved to the right */}
    </nav>
  );
};

export default NavBar;
