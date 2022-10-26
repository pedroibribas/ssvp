const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const isUsernameValid = username.length >= 8;

  if (!isUsernameValid) {
    res.status(400);
    throw new Error("Username must be greater than 8 characters");
  };

  const doesUserExists = await User.findOne({ username });

  if (doesUserExists) {
    res.status(400);
    throw new Error("Username already exists");
  };

  const isPasswordValid = password.length >= 8;

  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Password must be greater than 8 characters");
  };

  const userData = {
    username,
    password
  };

  const user = await User.create(userData);

  if (!user) {
    res.status(400);
    throw new Error("Cannot register user to database");
  };

  res.status(201).json({ message: "User registered" });
});

const getUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  };

  const doesPasswordMatches = password === user.password;

  if (!doesPasswordMatches) {
    res.status(400);
    throw new Error("Password is wrong");
  }

  const session = {
    username: user.username,
    token: generateToken(user._id)
  };

  res.status(200).json(session);
});

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

module.exports = { registerUser, getUser };