const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const isauth = require("../middleware/is-auth");
const authController = require("../controllers/auth");
const jwt = require("jsonwebtoken");

router.post(
  "/login",
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("min length to be is 5"),
  body("email").isEmail(),
  authController.login
);
router.post(
  "/signup",
  body("name").trim().notEmpty(),
  body("email").isEmail(),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("min length to be is 5"),

  authController.signup
);
router.get("/profile", isauth, authController.profile);
module.exports = router;
