const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.post("/signup", userController.createUser);
router.post("/data/:id", authenticate, userController.dataCollection);
router.post("/login", userController.login);
router.post("/refresh", userController.refresh);

module.exports = router;
