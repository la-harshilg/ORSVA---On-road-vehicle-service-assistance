const router = require("express").Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/imageupload");

const {
  registerMechanic,
  loginMechanic,
  getProfile,
  deleteMechanic,
  logoutMechanic,
  getNearbyMechanics,
  getAllMechanics,
} = require("../controllers/mechanics.controller");

router.post("/register", upload.single("profileImg"), registerMechanic);
router.post("/login", loginMechanic);
router.get("/profile", auth, getProfile);
router.delete("/delete", auth, deleteMechanic);
router.get("/logout", auth, logoutMechanic);
router.get("/nearbymechanics", auth, getNearbyMechanics);
router.get("/allmechanics", auth, getAllMechanics);

module.exports = router;
