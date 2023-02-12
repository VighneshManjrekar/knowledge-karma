const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const Res = require("../models/res.model");
const ErrorResponse = require("../utils/errorResponse");
const sendMail = require("../utils/mail");

// @desc    Get all resources
// @route   GET api/admin/resources
// @access  Private/Admin
exports.getResources = asyncHandler(async (req, res, next) => {
  const resources = await Res.find();
  res.status(200).json({ success: true, data: resources });
});

exports.updateResources = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resources = await Res.findOneAndUpdate({ _id: id }, { status: true });
  res.status(200).json({ success: true, data: resources });
});
