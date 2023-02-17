const Res = require("../models/res.model");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get approved resources
// @route   GET api/resources
// @access  Private
exports.getResources = asyncHandler(async (req, res, next) => {
  const branches = ["CHEM", "MECH", "COMP", "ELEC", "EXTC", "CIVIL", "OTHER"];
  let filter = {};
  if (req.query.branch) {
    const branchesRequested = req.query.branch.toUpperCase().split(",");
    branchesRequested.forEach((branch) => {
      if (!branches.includes(branch)) {
        branchesRequested.pop(branch);
      }
    });
    // req.query.branch = { $in: branchesRequested };
    filter.branch = { $in: branchesRequested };
  } else {
    delete req.query.branch;
  }
  // implement search query
  filter.name = { $regex: req.query.search || "", $options: "i" };
  const queryFilter = {
    status: true,
    ...filter,
  };
  const queryParams = { status: true };
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 9;
  const startId = (page - 1) * limit;
  const endId = page * limit;
  const query = await Res.find(queryFilter).skip(startId).limit(limit);
  const total = await Res.countDocuments();
  const pagination = { total };
  if (endId < total) {
    pagination.next = page + 1;
    pagination.limit = limit;
  }
  if (startId > 0) {
    pagination.prev = page - 1;
    pagination.limit = limit;
  }
  const results = await query;
  res
    .status(200)
    .json({ success: true, count: results.length, pagination, data: results });
});

// @desc    Get single resource
// @route   GET api/resources/:id
// @access  Public
exports.getResource = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resource = await Res.findOne({ _id: id }).populate(
    "owner",
    "name email profile"
  );
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
    image,
    owner,
    image,
  } = req.body;

  const resource = await Res.create({
    name,
    description,
    branch,
    year,
    subjectCode,
    price,
    image,
    type,
    link,
    owner,
    image
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
  const resource = await Res.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!resource) {
    return next(new ErrorResponse("User is not an owner", 401));
  }
  const resourceDeleted = await resource.remove();
  res.status(201).json({ success: true, data: resourceDeleted });
});
