// Shows a product in card format
// Handles favorite state using props
//userstory 1
// Product Catalog with React Basics (Components, Props, State, Events)
import React from "react";
import { Link } from "react-router-dom";
// ProductCard component
const ProductCard = ({ product, isFav, toggleFav }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card p-3 shadow-sm">
        <h5>{product.name}</h5>
        <small className="text-muted">{product.category}</small>

        <p className="mt-2 text-truncate">{product.description}</p>

        <div className="d-flex justify-content-between">
          <strong>₹ {product.price}</strong>

          <button
            className={`btn btn-sm ${isFav ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => toggleFav(product.id)}
          >
            {isFav ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>

        <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm mt-3">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
