const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Mechanic = require("../models/mechanic.model");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "user") {
      const user = await User.findOne({
        _id: decoded._id,
        isDeleted: false,
      });
      if (!user) {
        throw new Error("User not found.");
      }
      await user.populate({
        path: "vehicle",
        select: "modelname carno",
      });
      await user.populate({
        path: "vehicles",
        select: "modelname carno",
      });
      req.user = user;
    } else if (decoded.role === "mechanic") {
      const mechanic = await Mechanic.findOne({
        _id: decoded._id,
      });
      if (!mechanic) {
        throw new Error("Mechanic not found.");
      }
      await mechanic.populate({
        path: "services",
        select: "name amount description",
      });
      req.mechanic = mechanic;
    }
    req.token = token;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).send({
        error: "Session Expired.Please Login again.",
      });
    }
    return res.status(401).send({
      error: "Please Authenticate to access.",
    });
  }
};

module.exports = auth;
