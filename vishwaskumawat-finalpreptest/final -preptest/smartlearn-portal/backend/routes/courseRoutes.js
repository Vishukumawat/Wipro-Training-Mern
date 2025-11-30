
// Handles Course creation and fetching

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');

const Course = require('../models/Course');
const { createCourseValidation } = require('../validation/courseValidation');

// @route   POST /api/courses
// @desc    Create a new course
// @access  Public (for this assignment)
router.post('/', createCourseValidation, async (req, res, next) => {
  const errors = validationResult(req);

  // If validation failed, respond with errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      data: errors.array(),
      message: 'Validation error'
    });
  }

  const { courseId, title, category, price } = req.body;

  try {
    // Check if courseId already exists
    const existing = await Course.findOne({ courseId });
    if (existing) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'courseId already exists'
      });
    }

    const course = await Course.create({
      courseId,
      title,
      category,
      price
    });

    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/courses
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: courses,
      message: 'Courses fetched successfully'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
