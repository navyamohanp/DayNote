const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");

router.use("/auth", require("./auth"));
router.use("/journals", authenticate, require("./journal"));

module.exports = router;
