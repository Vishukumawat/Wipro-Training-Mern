
// express-validator rules for Course POST request

const { body } = require('express-validator');

const createCourseValidation = [
  body('courseId')
    .notEmpty().withMessage('courseId is required')
    .isString().withMessage('courseId must be a string'),
  body('title')
    .notEmpty().withMessage('title is required'),
  body('category')
    .notEmpty().withMessage('category is required'),
  body('price')
    .notEmpty().withMessage('price is required')
    .isFloat({ min: 0 }).withMessage('price must be a number >= 0')
];

module.exports = {
  createCourseValidation
};
