
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


// app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"TailorFit Backend is running",
        data:null
    });
});

//public routes (login ,register)
app.use('/api/auth',authRoutes);

// Protected routes (only logged-in admin)
app.use('/api/customers',auth,customerRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;

