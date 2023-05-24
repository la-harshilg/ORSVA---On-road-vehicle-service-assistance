const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const toLatLng = require("../utils/addresstolatlng");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Service = require("./service.model");
const crypto = require("crypto");

const mechanicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name should be entered."],
    },
    email: {
      type: String,
      required: [true, "Email must be entered."],
      unique: [true, "Email already taken."],
      lowercase: true,
      trim: true,
      validate: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid.");
        }
      },
    },
    mobile: {
      type: String,
      required: [true, "Mobile Number must be entered."],
      unique: [true, "Mobile number already taken."],
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, ["en-IN"])) {
          throw new Error("Mobile number is invalid.");
        }
      },
    },
    address: {
      type: String,
      required: [true, "Address must be entered."],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    password: {
      type: String,
      required: [true, "Password should be entered."],
      trim: true,
      minlength: [8, "Password should contain minimum 8 letters."],
    },
    profileImg: {
      type: String,
      required: [true, "Profile Image is required."],
    },
    services: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Service",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

mechanicSchema.index({ location: "2dsphere" });

mechanicSchema.methods.generateAuthToken = async function () {
  const mechanic = this;
  const token = jwt.sign(
    { _id: mechanic._id.toString(), role: "mechanic" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

mechanicSchema.methods.toJSON = function () {
  const mechanic = this;
  const mechanicObject = mechanic.toObject();
  delete mechanicObject.password;
  delete mechanicObject.createdAt;
  delete mechanicObject.updatedAt;
  delete mechanicObject.__v;
  return mechanicObject;
};

mechanicSchema.pre("save", async function (next) {
  const ll = await toLatLng(this.address);
  const loc = { type: "Point", coordinates: [ll.lat, ll.lng] };
  this.location = loc;
  next();
});

mechanicSchema.statics.findByCredentials = async (email, password) => {
  const mechanic = await Mechanic.findOne({ email, isDeleted: false }).populate(
    {
      path: "services",
      select: "desc",
    }
  );
  if (!mechanic) {
    throw new Error("Mechanic not found");
  }
  const isMatch = await bcrypt.compare(password, mechanic.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  return mechanic;
};

//Changed Password
mechanicSchema.methods.changedPasswordAfter = function (tokenTime) {
  if (this.passwordChangedAt) {
    const convertpasswordChangedAt = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return tokenTime < convertpasswordChangedAt;
  }
  //false means not changed..
  return false;
};

// Reset Token
mechanicSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

mechanicSchema.pre("remove", async function (next) {
  await Service.deleteMany({ mechanic: this._id });
  next();
});

const Mechanic = mongoose.model("Mechanic", mechanicSchema);

module.exports = Mechanic;
