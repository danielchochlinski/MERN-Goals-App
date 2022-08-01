const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");

// @desc        Create user
// @router      POST /api/users
// @paccess     Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hash password
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc        Authenicate user
// @router      POST /api/login
// @paccess     Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //check pass
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id, user.isAdmin),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc        Get user data
// @router      GET /api/users/me
// @paccess     Public
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc        Update user
// @router      PUT /api/users/me
// @paccess     Private
const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: "registered user" });
});

//Generate GWT
const generateToken = (id, admin) => {
  return jwt.sign({ id, admin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
};
