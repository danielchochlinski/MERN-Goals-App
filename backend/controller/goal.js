const asyncHandler = require("express-async-handler");
// @desc        Get goals
// @router      GET /api/goals
// @paccess     Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "goals" });
});

// @desc        Set goals
// @router      POST /api/goals
// @paccess     Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add text field");
  }
  res.status(200).json({ message: "goal created" });
});

// @desc        Update goals
// @router      PUT /api/goals/:id
// @paccess     Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Goal updated ${req.params.id}` });
});

// @desc        Delete goals
// @router      DELETE /api/goals/:id
// @paccess     Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Goal deleted ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
