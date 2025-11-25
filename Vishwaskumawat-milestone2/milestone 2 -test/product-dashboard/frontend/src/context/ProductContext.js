// Context to store products globally and refresh after adding a new one
// axios to fetch api data
//userstory 2
//Routing + API Integration (GET /products, GET /products/:id)
//userstory 3
//Formik + Yup Validation + POST API + Context API

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();
// Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products once
  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
// Add product
  const addProduct = async (product) => {
    const res = await axios.post("http://localhost:5000/products", product);
    setProducts([...products, res.data]);
  };
// Return provider
  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
