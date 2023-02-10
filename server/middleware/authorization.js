const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(user.id);
  next();
});
