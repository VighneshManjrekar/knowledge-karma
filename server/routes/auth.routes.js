const router = require("express").Router();

const { register, login, getUser } = require("../controllers/auth.controllers");
const { protect } = require("../middleware/authorization");

// public routes
router.post("/register", register);
router.post("/login", login);

// protected routes
router.get("/profile", protect, getUser);

module.exports = router;
