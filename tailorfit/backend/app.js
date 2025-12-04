//
// Set up Express app, middleware, routes

// import all required modules
const express = require('express');
const cors = require('cors');

// import routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

// import auth middleware
const auth = require("./middleware/authMiddleware");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// create Express app
const app = express();

app.use(
  cors({
    origin: [
      "https://tailorfit-shop.netlify.app",
      "http://localhost:3000"
    ],
    credentials: true
  })
);

app.options("/*", cors());

// parse JSON body
app.use(express.json());

// Public routes (login, register)
app.use('/api/auth', authRoutes);

// Protected routes (customers)
app.use('/api/customers', auth, customerRoutes);

// ✔ Catch-all route SHOULD BE AT THE END ONLY
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TailorFit Backend is running",
    data: null
  });
});

// error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
