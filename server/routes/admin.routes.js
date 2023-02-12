const router = require("express").Router();

const {
  getResources,
  updateResources,
  deleteResources,
} = require("../controllers/admin.controllers");
const { admin, protect } = require("../middleware/authorization");

router.route("/resources").get(protect, admin, getResources);
router
  .route("/resources/:resourceId")
  .put(protect, admin, updateResources)
  .delete(protect, admin, deleteResources);

module.exports = router;
