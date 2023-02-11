const Res = require("../models/res.model");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get approved resources
// @route   GET api/resources
// @access  Private
exports.getResources = asyncHandler(async (req, res, next) => {
  const resources = await Res.find({ status: true });
  res.status(200).json({ success: true, data: resources });
});

// @desc    Get all resources
// @route   GET api/resources/status
// @access  Private
exports.getAllResources = asyncHandler(async (req, res, next) => {
  const resources = await Res.find();
  res.status(200).json({ success: true, data: resources });
});

// @desc    Get single resource
// @route   GET api/resources/:id
// @access  Private
exports.getResource = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resource = await Res.findOne({ _id: id });
  if (!resource) return next(new ErrorResponse(`Resource not found`, 404));
  res.status(200).json({ success: true, data: resource });
});

// @desc    Add resource
// @route   POST api/resources
// @access  Private
exports.createResources = asyncHandler(async (req, res, next) => {
  req.body.owner = req.user._id;
  const {
    name,
    description,
    branch,
    year,
    subjectCode,
    price,
    type,
    link,
    owner,
  } = req.body;

  const resource = await Res.create({
    name,
    description,
    branch,
    year,
    subjectCode,
    price,
    type,
    link,
    owner,
  });
  res.status(201).json({ success: true, data: resource });
});

// @desc    Update resource
// @route   PUT api/resources/:id
// @access  Private
exports.updateResources = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resource = await Res.findOne({ _id: id, owner: req.user._id });
  if (!resource) {
    return next(new ErrorResponse("User is not an owner", 401));
  }
  const { name, description, branch, year, subjectCode, price, type, link } =
    req.body;
  const resUpdated = await Res.findByIdAndUpdate(
    id,
    { name, description, branch, year, subjectCode, price, type, link },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({ success: true, data: resUpdated });
});

// @desc    Delete resource
// @route   Delete api/resources/:id
// @access  Private
exports.deleteResources = asyncHandler(async (req, res, next) => {
  const resourceDeleted = await Res.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!resourceDeleted) {
    return next(new ErrorResponse("User is not an owner", 401));
  }
  res.status(201).json({ success: true, data: resourceDeleted });
});
