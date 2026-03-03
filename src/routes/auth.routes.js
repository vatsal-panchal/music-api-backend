const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth.controller");

router.post("/register", authcontroller.registerUser);
router.post("/login", authcontroller.loginUser);
router.post("/logout", authcontroller.logoutUser);

module.exports = router;
