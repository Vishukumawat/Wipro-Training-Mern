import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function DestinationCard({ title, image, price, description }) {
  const [wishlisted, setWishlisted] = useState(false);

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
  };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card shadow-sm h-100 border-0 destination-card"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        {/* Image */}
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{
            height: "220px",
            objectFit: "cover",
            transition: "0.3s"
          }}
        />

        <div className="card-body">
          <h5 className="card-title fw-bold" style={{ color: "#0d6efd" }}>
            {title}
          </h5>

          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            {description}
          </p>

          <h6 className="fw-semibold" style={{ color: "#198754" }}>
            {price}
          </h6>

          <button
            className={`btn w-100 mt-3 ${
              wishlisted ? "btn-danger" : "btn-outline-primary"
            }`}
            onClick={handleWishlist}
          >
            {wishlisted ? " Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;
