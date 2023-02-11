const router = require("express").Router();

const { getResources } = require("../controllers/admin.controllers");
const { admin, protect } = require("../middleware/authorization");

router.route("/resources").get(protect, admin, getResources);

module.exports = router;
