const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/data/:id", authenticate, authController.dataCollection);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/forgot", authController.forgotPassword);
router.post("/verify", authController.verifyOtp);
router.post("/reset-password", authController.resetPassword);
router.post("/logout", authenticate, authController.login);

module.exports = router;
