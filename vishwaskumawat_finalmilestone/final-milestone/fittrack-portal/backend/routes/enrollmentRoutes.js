const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const Enrollment = require("../models/Enrollment");
const Program = require("../models/Program");
const { enrollValidation } = require("../validation/enrollmentValidation");
// Enrollment route
router.post("/", enrollValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      message: "Validation error",
      data: errors.array()
    });

  const { userId, programId } = req.body;
// Check if program exists and handle enrollment
  try {
    const program = await Program.findOne({ programId });
    if (!program)
      return res.status(400).json({
        success: false,
        message: "Program not found",
        data: null
      });
// Check for existing enrollment
    const exists = await Enrollment.findOne({ userId, programId });
    if (exists)
      return res.status(400).json({
        success: false,
        message: "Already enrolled",
        data: null
      });
// Create new enrollment
    const enroll = await Enrollment.create({ userId, programId });

    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      data: enroll
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
