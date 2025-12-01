exports.notFound = (req, res) => {
  // Handle 404 errors
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null
  });
};
// General error handler
exports.errorHandler = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
    data: null
  });
};
