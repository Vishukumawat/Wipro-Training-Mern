// routes/authRoutes.js
// Handles admin registration (for setup) and login with JWT

const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

/**
 * Helper: generate JWT
 */
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

/**
 * POST /api/auth/register
 * Only for first time admin creation.
 * (You can delete/disable this route later in production)
 */
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        data: errors.array()
      });
    }

    try {
      const { email, password } = req.body;

      const existing = await Admin.findOne({ email });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Admin already exists",
          data: null
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const admin = await Admin.create({
        email,
        password: hashedPassword
      });

      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        data: { id: admin._id, email: admin.email }
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/auth/login
 * Logs in admin and returns JWT token
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        data: errors.array()
      });
    }

    try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
          data: null
        });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
          data: null
        });
      }

      const token = generateToken(admin);

      res.json({
        success: true,
        message: "Login successful",
        data: { token }
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;


