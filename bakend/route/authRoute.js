const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forget-password", authController.passwordForget);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
