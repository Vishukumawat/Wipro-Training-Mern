
// Handles course enrollment logic

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');

const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { enrollValidation } = require('../validation/enrollmentValidation');

// @route   POST /api/enroll
// @desc    Enroll a user in a course
// @access  Public (for this assignment)
router.post('/', enrollValidation, async (req, res, next) => {
  const errors = validationResult(req);

  // Validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      data: errors.array(),
      message: 'Validation error'
    });
  }

  const { userId, courseId } = req.body;

  try {
    // courseId must exist in Course collection
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Course not found for given courseId'
      });
    }

    // Prevent duplicate enrollment
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'User already enrolled in this course'
      });
    }

    // Create new enrollment
    const enrollment = await Enrollment.create({ userId, courseId });

    res.status(201).json({
      success: true,
      data: enrollment,
      message: 'Enrollment successful'
    });
  } catch (err) {
    // Handle duplicate key error from unique index too
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Duplicate enrollment not allowed'
      });
    }
    next(err);
  }
});

module.exports = router;
