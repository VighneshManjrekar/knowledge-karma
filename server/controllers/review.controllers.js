const Review = require("../models/review.model");
const Res = require("../models/res.model");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc  Get resource reviews
// @route GET api/resources/:resourceId/reviews
// @access Private
exports.getReviews = asyncHandler(async (req, res, next) => {
  const { resourceId } = req.params;
  const reviews = await Review.find({ resource: resourceId }).populate(
    "user",
    "name email"
  );
  return res.status(200).json({ success: true, data: reviews });
});

// @desc  Create review
// @route POST api/resources/:resourceId/reviews
// @access Private
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.resource = req.params.resourceId;
  console.log(req.params);
  req.body.user = req.user.id;
  const { title, text, rating, resource, user } = req.body;
  console.log(resource);
  const resourceFound = await Res.findOne({ _id: resource, status: true });
  if (!resourceFound) {
    return next(new ErrorResponse(`No resource with id ${resource}`, 404));
  }
  console.log(resourceFound.owner.toString(), user);
  if (resourceFound.owner.toString() == user) {
    return next(new ErrorResponse("User can't comment on own resources", 400));
  }
  const review = await Review.create({
    title,
    text,
    rating,
    resource,
    user,
  });
  res.status(201).json({ success: true, data: review });
});

// @desc  Get single review
// @route GET api/resources/:resourceId/reviews/:reviewId
// @access Private
exports.getReview = asyncHandler(async (req, res, next) => {
  const { reviewId, resourceId } = req.params;
  const review = await Review.findOne({
    _id: reviewId,
    resource: resourceId,
  }).populate("user", "name email");

  if (!review) {
    return next(new ErrorResponse("Review not found", 404));
  }
  return res.status(200).json({ success: true, data: review });
});

// @desc  Delete review
// @route DELETE api/resources/:resourceId/reviews/:reviewId
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { resourceId, reviewId } = req.params;
  console.log(resourceId, reviewId)
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    user: req.user._id,
    resource: resourceId,
  });
  if (!review) return next(new ErrorResponse("Resource not found", 404));

  res.status(200).json({ success: true, data: review });
});
