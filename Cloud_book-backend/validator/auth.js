const { check } = require("express-validator");

const signupValidator = [
  check("name").notEmpty().withMessage("name is required!"),
  check("email")
    .isEmail()
    .withMessage("invalid email")
    .notEmpty()
    .withMessage("email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters long!")
    .notEmpty()
    .withMessage("password is required"),
];

const loginValidator = [
  check("email")
    .isEmail()
    .withMessage("invalid email")
    .notEmpty()
    .withMessage("email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters long!")
    .notEmpty()
    .withMessage("password is required"),
];

const getUserValidator = [
  check("_id")
    .isMongoId()
    .withMessage("id is required")
    .notEmpty()
    .withMessage("invalid id"),
];

module.exports = { signupValidator, loginValidator, getUserValidator };
