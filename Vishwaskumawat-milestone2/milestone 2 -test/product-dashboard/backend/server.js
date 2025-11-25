// backend/server.js
// Product Dashboard
// Provides GET (all, single) + POST (add product)
// In-memory database for demo
//userstory 2
//Routing + API Integration (GET /products, GET /products/:id)
//userstory 3
//Formik + Yup Validation + POST API + Context API

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mock DB for demo
let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    category: "Electronics",
    description: "Over-ear headphones with noise cancellation."
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 2499,
    category: "Footwear",
    description: "Comfortable daily running shoes."
  }
];

// Default route
app.get("/", (req, res) => {
  res.send("Product API running...");
});

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET product by ID
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// POST add new product
app.post("/products", (req, res) => {
  const { name, price, category, description } = req.body;

  if (!name || !price || !category || !description) {
    return res.status(400).json({ error: "All fields required" });
  }
// Create new product
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    description
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
