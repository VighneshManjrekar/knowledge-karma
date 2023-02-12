const router = require("express").Router();

const { getResources, updateResources } = require("../controllers/admin.controllers");
const { admin, protect } = require("../middleware/authorization");

// router.route("/resources").get(protect, admin, getResources);
router.route("/resources").get(protect, admin, getResources)
router.route("/resources/:id").put(protect, admin, updateResources);

module.exports = router;
