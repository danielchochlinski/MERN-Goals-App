const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalSchema");
const User = require("../models/userSchema");
// @desc        Get goals
// @router      GET /api/goals
// @paccess     Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc        Set goals
// @router      POST /api/goals
// @paccess     Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add text field");
  }
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  res.status(200).json(goal);
});

// @desc        Update goals
// @router      PUT /api/goals/:id
// @paccess     Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("no goal found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //check fo connection between user and goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc        Delete goals
// @router      DELETE /api/goals/:id
// @paccess     Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("no goal found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //check fo connection between user and goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
