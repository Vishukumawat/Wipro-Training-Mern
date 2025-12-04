const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const auth = require("./middleware/authMiddleware");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "https://tailorfit-shop.netlify.app",
      "http://localhost:3000"
    ],
    credentials: true
  })
);

app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/customers', auth, customerRoutes);

// Simple root route — THIS IS OK
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TailorFit Backend is running"
  });
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
