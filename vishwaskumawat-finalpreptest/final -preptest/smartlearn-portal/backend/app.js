// app.js
// Express app initialization, middlewares, and routes

const express = require('express');
const cors = require('cors');

const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Global middlewares
app.use(cors()); // allow requests from React (3000)
app.use(express.json()); // parse JSON body

// Basic health-check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: null,
    message: 'SmartLearn API is running'
  });
});

// API routes
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollmentRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
