const express = require("express");
const cors = require("cors");
const programRoutes = require("./routes/programRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
// Initialize Express app
const app = express();
//  Middleware
app.use(cors());
app.use(express.json());
// Routes 

app.use("/api/programs", programRoutes);
app.use("/api/enroll", enrollmentRoutes);
// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
