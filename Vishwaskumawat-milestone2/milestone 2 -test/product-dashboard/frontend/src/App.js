// Handles all routes and lazy loads the ProductDetail page
//userstory 2
//Routing + API Integration (GET /products, GET /products/:id)

import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";
// Lazy load ProductDetail
const ProductDetail = lazy(() => import("./components/ProductDetail"));

function App() {
  // Render app layout
  return (
    <>
      {/* Simple Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">
          Product Dashboard
        </Link>
        <div>
          <Link to="/" className="btn btn-outline-light btn-sm mx-2">
            Catalog
          </Link>
          <Link to="/add" className="btn btn-success btn-sm">
            Add Product
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Suspense fallback={<p className="text-center mt-4">Loading page...</p>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
