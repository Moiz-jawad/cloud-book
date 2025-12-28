const express = require("express");
const router = express.Router();

const { authController } = require("../controller");
const { signupValidator, loginValidator } = require("../validator/auth");
const { validate } = require("../validator/validate");
const isAuth = require("../middleware/isAuth");

router.post("/signup", signupValidator, validate, authController.signup);

router.post("/login", loginValidator, validate, authController.login);

router.get("/user", isAuth, authController.getUser);

module.exports = router;
