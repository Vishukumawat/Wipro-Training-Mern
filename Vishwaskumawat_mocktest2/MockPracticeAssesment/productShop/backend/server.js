
  // quetion 9
  // Express Routing + Middleware + Validation 

  
const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

// global middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Shoes", price: 2000 },
    { id: 2, name: "Watch", price: 1500 },
  ]);
});

// POST with validation
app.post(
  "/products",
  [
    body("name").notEmpty(),
    body("price").isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    res.json({ message: "Product added", data: req.body });
  }
);

// ADD this in server.js below products routes
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  // Demo hardcoded data
  const user = {
    id,
    name: `User ${id}`,
    email: `user${id}@test.com`,
  };

  res.json(user);
});


app.listen(4000, () => console.log("API running on 4000"));
