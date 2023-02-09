const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");

const sendToken = (user, statusCode, res) => {
  user.password = undefined;
  const token = user.getSignToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV ? true : false,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// @desc    Register a user
// @route   POST api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json({ success: true, data: user });
});

// @desc    Login user
// @route   POST api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  const isValid = await user.matchPassword(password);
  if (!user || !isValid) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendToken(user, 200, res);
});
