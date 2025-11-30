
// Mongoose schema for Course model

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
     required: true,
    unique: true, // unique courseId
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // price cannot be negative
  },
  createdAt: {
    type: Date,
    default: Date.now // default current date
  }
});

module.exports = mongoose.model('Course', courseSchema);
