const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/user", auth, userController.updateUser);
router.delete("/user", auth, userController.deleteUser);

module.exports = router;
