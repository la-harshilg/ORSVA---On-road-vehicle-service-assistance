const router = require("express").Router();
const {
  addVehicle,
  deleteVehicle,
  selectPrimaryVehicle,
  getVehiclesbyuser,
} = require("../controllers/vehicles.controller");
const auth = require("../middlewares/auth");

router.post("/add", auth, addVehicle);
router.delete("/delete/:vehicleId", auth, deleteVehicle);
router.post("/setprimary/:vehicleId", auth, selectPrimaryVehicle);
router.get("/byusers", auth, getVehiclesbyuser);

module.exports = router;
