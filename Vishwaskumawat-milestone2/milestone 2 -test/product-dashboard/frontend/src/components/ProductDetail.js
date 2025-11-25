// Display single product detail fetched from backend
//userstory 2
//Routing + API Integration (GET /products, GET /products/:id)
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// ProductDetail component
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
// Fetch product
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null));
  }, [id]);
// Render product detail or error message
  if (!product) return <p className="text-center mt-4">Product not found...</p>;

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h2>{product.name}</h2>
        <p className="text-muted">{product.category}</p>
        <p>{product.description}</p>
        <h4>₹ {product.price}</h4>

        <Link className="btn btn-secondary mt-3" to="/">
          Back
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
