const express = require("express");
const router = express.Router();
const authController = require("@/controllers/auth.controller");
const validate = require("@/middlewares/validate");

router.post("/register", validate, authController.register);
router.post("/login", validate, authController.login);

module.exports = router;
