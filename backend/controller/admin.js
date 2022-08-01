const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalSchema");
const User = require("../models/userSchema");

// @desc        Get all users
// @router      GET /admin/users
// @paccess     Private
const getAllUsers = asyncHandler(async (req, res) => {
  if (req.user.isAdmin !== true) {
    res.status(400);
    throw new Error("not authorized");
  }
  const users = await User.find();
  res.send(users);
  //   res.send({ message: "all ussrs" });
});

// @desc        Delete user
// @router      DELETE /admin/user/:id
// @paccess     Private
const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.isAdmin !== true) {
    res.status(400);
    throw new Error("not authorized");
  }

  const user = await User.findById(req.params.id);
  await user.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getAllUsers, deleteUser };
