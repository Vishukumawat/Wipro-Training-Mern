

// 404 handler for invalid routes
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    data: null,
    message: 'Route not found'
  });
};

// General error handler
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    data: null,
    message: err.message || 'Server Error'
  });
};

module.exports = {
  notFound,
  errorHandler
};
