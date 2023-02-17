const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const Res = require("../models/res.model");
const ErrorResponse = require("../utils/errorResponse");
const sendMail = require("../utils/mail");

// @desc    Get all resources
// @route   GET api/admin/resources
// @access  Private/Admin
exports.getResources = asyncHandler(async (req, res, next) => {
  const resources = await Res.find({ status: false });
  res.status(200).json({ success: true, data: resources });
});

// @desc    Update resources
// @route   PUT api/admin/resources/:resourceId
// @access  Private/Admin
exports.updateResources = asyncHandler(async (req, res, next) => {
  // const { status } = req.body;
  const { resourceId } = req.params;
  const updatedRes = await Res.findOneAndUpdate(
    { _id: resourceId },
    { status: true },
    { new: true, runValidators: true }
  );
  if (!updatedRes) {
    return next(new ErrorResponse("Resource not found", 404));
  }
  res.status(200).json({ success: true, data: updatedRes });
});

// @desc    Delete resources
// @route   DELETE api/admin/resources/:resourceId
// @access  Private/Admin
exports.deleteResources = asyncHandler(async (req, res, next) => {
  const { resourceId } = req.params;
  const { reason } = req.body;
  const resource = await Res.findOne({ _id: resourceId });
  const user = await User.findOne({ _id: resource.owner });
  if (!resource) {
    return next(new ErrorResponse("Resource not found", 404));
  }
  const deletedResource = await resource.remove();
  const text = `
  Hi ${user.name},
  Your uploaded resource ${deletedResource.name} has been deleted by admin. Due to ${reason}
  Thanks, Knowledge Karma team.
  `;
  const option = {
    to: user.email,
    subject: "Resource deleted",
    text,
  };

  await sendMail(option);
  res.status(200).json({ success: true, data: deletedResource });
});
