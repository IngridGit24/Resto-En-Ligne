import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div
      className={`d-flex flex-column bg-dark text-white ${
        isCollapsed ? "collapsed" : ""
      }`}
      style={{
        width: isCollapsed ? "60px" : "200px",
        transition: "width 0.3s",
      }}
    >
      <button className="btn btn-dark text-light" onClick={toggleCollapse}>
        Menu
      </button>
      <ul className={`list-unstyled ${isCollapsed ? "d-none" : ""}`}>
        <li className="nav-item">
          <a className="nav-link text-white" href="#home">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#about">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#Resto">
            Resto
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
