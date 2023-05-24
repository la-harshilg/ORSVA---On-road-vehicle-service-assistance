const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required."],
  },
  amount: {
    type: Number,
    required: [true, "Service amount is required."],
    validate(value) {
      if (value < 0) {
        throw new Error("Amount cant be negative.");
      }
    },
  },
  description: {
    type: String,
    required: [true, "Service Description is required."],
  },
  mechanic: {
    type: mongoose.Types.ObjectId,
    ref: "Mechanic",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
