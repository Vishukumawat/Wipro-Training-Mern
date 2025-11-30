
// Enrollment model with unique (userId, courseId) combination

const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true
  },
  courseId: {
    type: String,
    required: true,
    trim: true
  },
  enrolledOn: {
    type: Date,
    default: Date.now // default now
  }
});

// Prevent duplicate enrollments: same userId + courseId
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
