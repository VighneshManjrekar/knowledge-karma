const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token; // we will remove following code in final deployment
  } else if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
  const user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  req.user = await User.findById(user.id);
  next();
});
