const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  getProfile,
  deleteUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controllers");
const upload = require("../middlewares/imageupload");

router.post("/register", upload.single("profileImg"), registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getProfile);
router.delete("/delete", auth, deleteUser);
router.get("/logout", auth, logoutUser);

//for both mechanic and user
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

module.exports = router;
