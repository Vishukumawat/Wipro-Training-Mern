import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0d6efd" }}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
           TravelHub
        </Link>

        {/* Toggle Button (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-semibold">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/packages">Packages</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/booking">Book Now</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
