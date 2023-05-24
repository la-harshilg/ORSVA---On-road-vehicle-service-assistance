const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Vehicle = require("./vehicle.model");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
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
    vehicle: {
      type: mongoose.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle is required."],
    },
    vehicles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Vehicle",
      },
    ],
    passwordChangedAt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: "user" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;
  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email, isDeleted: false })
    .populate({
      path: "vehicle",
      select: "modelname carno",
    })
    .populate({
      path: "vehicles",
      select: "modelname carno",
    });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  return user;
};

//Changed Password
userSchema.methods.changedPasswordAfter = function (tokenTime) {
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
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre("remove", async function (next) {
  await Vehicle.deleteMany({ user: this._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
