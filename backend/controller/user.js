// @desc        Create user
// @router      POST /api/users
// @paccess     Public
const registerUser = (req, res) => {
  res.json({ message: "registered user" });
};

// @desc        Authenicate user
// @router      POST /api/login
// @paccess     Public
const loginUser = (req, res) => {
  res.json({ message: "login  user" });
};

// @desc        Get user data
// @router      GET /api/users/me
// @paccess     Public
const getUser = (req, res) => {
  res.json({ message: "user data display" });
};

// @desc        Update user
// @router      PUT /api/users/me
// @paccess     Private
const updateUser = (req, res) => {
  res.json({ message: "registered user" });
};
module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
};
