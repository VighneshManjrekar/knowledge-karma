const router = require("express").Router({ mergeParams: true });

const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
} = require("../controllers/review.controllers");
const { protect } = require("../middleware/authorization");

// public routes
router.route("/").get(protect, getReviews).post(protect, createReview);
router
  .route("/:reviewId")
  .get(protect, getReview)
  .delete(protect, deleteReview);

module.exports = router;
