// routes/customerRoutes.js
// CRUD + search for customers (protected by auth middleware at app.js level)

const express = require("express");
const { body, validationResult } = require("express-validator");
const Customer = require("../models/Customer");

const router = express.Router();

// Validation for customer create/update
const customerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("mobile")
    .notEmpty()
    .withMessage("Mobile is required")
    .isLength({ min: 8 })
    .withMessage("Mobile looks too short")
];

// POST /api/customers - create
router.post("/", customerValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      data: errors.array()
    });
  }

  try {
    const { name, mobile, measurements, notes } = req.body;

    const customer = await Customer.create({
      name,
      mobile,
      measurements,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/customers?query=
router.get("/", async (req, res, next) => {
  try {
    const { query } = req.query;
    let filter = { isDeleted: false };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { mobile: { $regex: query, $options: "i" } }
      ];
    }

    const customers = await Customer.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Customers fetched",
      data: customers
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/customers/:id
router.get("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      isDeleted: false
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
        data: null
      });
    }

    res.json({
      success: true,
      message: "Customer fetched",
      data: customer
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/customers/:id
router.put("/:id", customerValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      data: errors.array()
    });
  }

  try {
    const { name, mobile, measurements, notes } = req.body;

    const updated = await Customer.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { name, mobile, measurements, notes },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
        data: null
      });
    }

    res.json({
      success: true,
      message: "Customer updated",
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/customers/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Customer.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
        data: null
      });
    }

    res.json({
      success: true,
      message: "Customer deleted",
      data: null
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
