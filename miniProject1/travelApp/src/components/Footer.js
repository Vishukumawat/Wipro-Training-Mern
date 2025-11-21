import React from "react";

function Footer() {
  return (
    <footer
      className="text-white mt-5 py-4"
      style={{ backgroundColor: "#0d6efd" }}
    >
      <div className="container text-center">

        <h5 className="fw-bold mb-2">TravelHub</h5>
        <p className="mb-1">Explore the world with comfort and confidence.</p>

        <p className="mt-3 mb-0 small">
          © 2025 TravelHub | Designed by <span className="fw-semibold">Vishwas</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
