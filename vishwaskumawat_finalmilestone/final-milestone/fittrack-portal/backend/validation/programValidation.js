const { body } = require("express-validator");
// Validation rules for program creation
exports.programValidation = [
  body("programId").notEmpty().withMessage("programId is required"),
  // Add more validation rules as needed
  body("name").notEmpty().withMessage("name is required"),
  body("category").notEmpty().withMessage("category is required"),
  
  body("level")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Invalid level"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be >= 0")
];
