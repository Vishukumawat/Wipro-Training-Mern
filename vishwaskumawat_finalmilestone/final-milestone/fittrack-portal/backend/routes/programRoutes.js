const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Program = require("../models/Program");
const { programValidation } = require("../validation/programValidation");
// Add new program
router.post("/", programValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      message: "Validation error",
      data: errors.array()
    });
    // Check for existing programId

  try {
    const exists = await Program.findOne({ programId: req.body.programId });
    if (exists)
      return res.status(400).json({
        success: false,
        message: "programId already exists",
        data: null
      });

    const program = await Program.create(req.body);
// Respond with the created program
    res.status(201).json({
      success: true,
      message: "Program added",
      data: program
    });
  } catch (err) {
    next(err);
  }
});
// Get all programs
router.get("/", async (req, res, next) => {
  try {
    const programs = await Program.find();
    res.json({
      success: true,
      message: "Programs fetched",
      data: programs
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
