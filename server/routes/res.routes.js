const router = require("express").Router();

const {
  getResources,
  getAllResources,
  createResources,
  getResource,
  updateResources,
  deleteResources,
} = require("../controllers/res.controllers");
const { protect } = require("../middleware/authorization");

// public routes
router.route("/").get(protect, getResources).post(protect, createResources);
router.get("/status", getAllResources);
router
  .route("/:id")
  .get(protect, getResource)
  .put(protect, updateResources)
  .delete(protect, deleteResources);

module.exports = router;
