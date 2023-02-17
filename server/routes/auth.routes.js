const router = require("express").Router();

const {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  logout,
  getRanking,
  subscribeResource,
  unsubscribeResource,
  getUser,
  updateProfile,
  reportRes,
} = require("../controllers/auth.controllers");
const { protect } = require("../middleware/authorization");

// public routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/ranking", getRanking);
router.get("/profile/:userId", getUser);

// protected routes
router.get("/profile", protect, getProfile);
router.post("/profile", protect, updateProfile);
router.get("/report/:resourceId", protect, reportRes);
router.get("/subscribe/:resourceId", protect, subscribeResource);
router.get("/unsubscribe/:resourceId", protect, unsubscribeResource);

module.exports = router;
