const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Request Description is required."],
    },
    reqLoc: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "inprogress", "completed", "cancelled"],
    },
    reqTime: Date,
    billAmount: {
      type: Number,
      required: [true, "Bill amount is required."],
    },
    vehicle: {
      type: mongoose.Types.ObjectId,
      ref: "Vehicle",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    service: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
    mechanic: {
      type: mongoose.Types.ObjectId,
      ref: "Mechanic",
    },
    payment_mode: String,
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
