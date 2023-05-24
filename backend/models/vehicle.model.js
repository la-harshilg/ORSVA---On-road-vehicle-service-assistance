const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  modelname: {
    type: String,
    required: [true, "Model Name must be required."],
  },
  carno: {
    type: String,
    unique: [true, "Car with this number is already registered."],
    required: [true, "Car number must be entered."],
    validate(value) {
      const valid = /[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}/.test(value);
      if (!valid) {
        throw new Error("Invalid Car number.");
      }
    },
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, "Vehicle must be added."],
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
