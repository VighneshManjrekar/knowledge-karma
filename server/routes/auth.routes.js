const router = require("express").Router();

const { register, login, verifyUser } = require("../controllers/auth.controllers");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify").get(verifyUser);

module.exports = router;
