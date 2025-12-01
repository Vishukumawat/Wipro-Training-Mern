const { body } = require("express-validator");
// Validation rules for enrollment
exports.enrollValidation = [
  body("userId").notEmpty().withMessage("userId is required"),
  body("programId").notEmpty().withMessage("programId is required")
];
