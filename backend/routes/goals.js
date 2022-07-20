const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controller/goal");
const { auth } = require("../middleware/authMiddleware");

router.get("/", auth, getGoals);

router.post("/", auth, setGoal);

router.put("/:id", auth, updateGoal);

router.delete("/:id", auth, deleteGoal);

module.exports = router;
