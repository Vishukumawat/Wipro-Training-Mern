require("dotenv").config();
// Import database connection and app
const connectDB = require("./config/db");
const app = require("./app");
// Connect to database
connectDB();
// Start server
app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:" + process.env.PORT);
});
