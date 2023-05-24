const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addService,
  deleteService,
  getServicesbymechanic,
  getMechanicServices,
} = require("../controllers/service.controller");

router.post("/add", auth, addService);
router.delete("/delete/:serviceId", auth, deleteService);
router.get("/bymechanics", auth, getServicesbymechanic);
router.get("/mechservices/:mechId", auth, getMechanicServices);

module.exports = router;
