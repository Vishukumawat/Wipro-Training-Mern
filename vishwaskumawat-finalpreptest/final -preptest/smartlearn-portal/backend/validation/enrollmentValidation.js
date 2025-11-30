
// express-validator rules for Enrollment POST request

const { body } = require('express-validator');

const enrollValidation = [
  body('userId')
    .notEmpty().withMessage('userId is required'),
  body('courseId')
    .notEmpty().withMessage('courseId is required')
];

module.exports = {
  enrollValidation
};
