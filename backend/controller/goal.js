const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalSchema");

// @desc        Get goals
// @router      GET /api/goals
// @paccess     Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
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
  const goal = await Goal.create({ text: req.body.text });
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

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
  await goal.remove();
  res.status(200).json({id: req.params.id});
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
