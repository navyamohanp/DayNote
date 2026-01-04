const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/signup", userController.createUser);
router.get("/getUser", authenticate, userController.getUser);
router.patch("/updateUser", authenticate, userController.updateUser);
router.delete("/deleteUser", authenticate, userController.deleteUser);

module.exports = router;
