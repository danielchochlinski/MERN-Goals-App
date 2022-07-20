const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser } = require("../controller/user");
const { auth } = require("../middleware/authMiddleware");

router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/me", auth, getUser);

module.exports = router;
