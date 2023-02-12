const router = require("express").Router();

const reviewRoutes = require("./review.routes");

const {
  getResources,
  createResources,
  getResource,
  updateResources,
  deleteResources,
} = require("../controllers/res.controllers");
const { protect } = require("../middleware/authorization");
router.use("/:resourceId/reviews", reviewRoutes);

// Protected routes
router.route("/").get(getResources).post(protect, createResources);
router
  .route("/:id")
  .get(getResource)
  .put(protect, updateResources)
  .delete(protect, deleteResources);


module.exports = router;
