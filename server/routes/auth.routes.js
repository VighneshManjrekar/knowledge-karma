const router = require("express").Router();

const {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  logout,
  getRanking,
} = require("../controllers/auth.controllers");
const { protect } = require("../middleware/authorization");

// public routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/ranking", getRanking);

// protected routes
router.get("/profile", protect, getProfile);

module.exports = router;
