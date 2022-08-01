const express = require("express");
const { getAllUsers, deleteUser } = require("../controller/admin");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");

router.get("/users", auth, getAllUsers);
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
