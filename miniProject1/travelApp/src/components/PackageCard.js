import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function PackageCard({ title, image, price, duration, description }) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card shadow-sm h-100 border-0 package-card"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        {/* Image Section */}
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{
            height: "220px",
            objectFit: "cover",
            transition: "0.3s",
          }}
        />

        {/* Content */}
        <div className="card-body">
          <h5 className="card-title fw-bold" style={{ color: "#0d6efd" }}>
            {title}
          </h5>

          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            {description}
          </p>

          {duration && (
            <p className="mt-1 text-secondary" style={{ fontSize: "0.85rem" }}>
               {duration}
            </p>
          )}

          <h6 className="fw-semibold mt-2" style={{ color: "#198754" }}>
            {price}
          </h6>
        </div>
      </div>
    </div>
  );
}

PackageCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  duration: PropTypes.string,
  description: PropTypes.string,
};

export default PackageCard;
