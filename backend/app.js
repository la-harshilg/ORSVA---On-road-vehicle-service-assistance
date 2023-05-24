const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
require("./db/mongoose");
require("dotenv").config();
const auth = require("./middlewares/auth");

const userRouter = require("./routes/userRoutes");
const vehicleRouter = require("./routes/vehicleRoutes");
const mechanicRouter = require("./routes/mechanicRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const requestRouter = require("./routes/requestRoutes");

app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({}));
app.use(express.json());

app.get("/", auth, (req, res) => {
  res.send("Welcome to ORVSA");
});

app.use("/user", userRouter);
app.use("/vehicle", vehicleRouter);
app.use("/mechanic", mechanicRouter);
app.use("/service", serviceRouter);
app.use("/request", requestRouter);

app.get("*", (req, res) => {
  res.send("Path does not exists.");
});
module.exports = app;
