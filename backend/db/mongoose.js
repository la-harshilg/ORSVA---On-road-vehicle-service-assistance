const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.MONGO_ATLAS_URL || process.env.MONGO_URL;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB Connected.");
  })
  .catch((err) => {
    console.log(err);
  });
