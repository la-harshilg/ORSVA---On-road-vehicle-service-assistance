const router = require("express").Router();
const {
  createRequest,
  getUserRequests,
  requestbyId,
  mechanicRequests,
  getPendingRequests,
  updateStatusRequests,
  totalRequests,
  weekwiseRequests,
} = require("../controllers/requests.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, createRequest);
router.get("/requestsbyuser", auth, getUserRequests);
router.get("/requestbyId/:id", auth, requestbyId);
router.get("/mechanicsrequests", auth, mechanicRequests);
router.get("/pendingrequests", auth, getPendingRequests);
router.post("/updatestatus/:id", auth, updateStatusRequests);
router.get("/totalrequests", auth, totalRequests);
router.get("/weekwiserequests", auth, weekwiseRequests);

module.exports = router;
