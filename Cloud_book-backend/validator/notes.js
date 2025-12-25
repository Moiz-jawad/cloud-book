const { check } = require("express-validator");

const noteValidator = () => [
  check("title").notEmpty().withMessage("Title is required!"),

  check("desc")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 5, max: 1000 })
    .withMessage("Description must be between 5 and 1000 characters"),

  check("tag")
    .notEmpty()
    .withMessage("Tag is required")
    .isString()
    .withMessage("Tag must be a string")
    .isIn(["General", "Work", "Personal", "Important"])
    .withMessage("Tag must be one of: General, Work, Personal, Important"),
];

module.exports = { noteValidator };
