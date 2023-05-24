const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Vehicle = require("../models/vehicle.model");
const { sendMail } = require("../utils/sendMail");
const crypto = require("crypto");
const Mechanic = require("../models/mechanic.model");

// Register User
const registerUser = async (req, res) => {
  try {
    const vehicleId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    const { name, email, mobile, password, vehicleModel, vehicleNo } = req.body;

    if (!vehicleModel || !vehicleNo) {
      throw new Error("Provide your vehicle information to proceed.");
    }

    const vehicleExists = await Vehicle.findOne({ carno: vehicleNo });

    if (vehicleExists) {
      throw new Error("Vehicle with this number is already registered.");
    }

    const vehicle = new Vehicle({
      _id: vehicleId,
      modelname: vehicleModel,
      carno: vehicleNo,
      user: userId,
    });

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User with email already exists.");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    if (!password) {
      throw new Error("Password is required.");
    }

    const user = new User({
      _id: userId,
      name,
      email,
      mobile,
      password: hashPassword,
      profileImg: req.file.location,
      vehicle: vehicleId,
      vehicles: [vehicleId],
    });

    await user.save();
    await vehicle.save();

    const token = await user.generateAuthToken();
    return res.status(201).json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      const keys = Object.keys(error.keyValue);
      return res.status(400).send({
        error: `This ${keys[0]} is already being used`,
      });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      const customErrors = {};
      for (field in error.errors) {
        customErrors[field] = error.errors[field].message;
      }
      return res.status(400).send({
        error: customErrors,
      });
    }
    res.status(400).send({
      error: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return res.status(200).json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

// Get User Profile
const getProfile = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      user: user.toJSON(),
    });
  } catch (error) {
    return res.status(404).json({ error: "User not found." });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  if (!req.body.email)
    return res.status(400).json({
      message: "Please provide your email address.",
    });
  const user = await User.findOne({ email: req.body.email });

  // For mechanic
  if (!user) {
    const mechanic = await Mechanic.findOne({ email: req.body.email });
    if (!mechanic) {
      return res
        .status(404)
        .json({ message: "There is no user or mechanic with email address." });
    }
    const resetToken = mechanic.createPasswordResetToken();
    await mechanic.save({ validateBeforeSave: false });

    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

    const message = `<h5>Forgot your password ?<h5> Go to this URL <a>${resetURL}</a>.\n If you did't forgot your password, please ignore this email!`;
    sendMail(req.body.email, message);

    return res.status(200).json({
      message: "Email sent Successfully.",
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

  const message = `<h5>Forgot your password ?<h5> Go to this URL <a>${resetURL}</a>.\n If you did't forgot your password, please ignore this email!`;
  sendMail(req.body.email, message);

  return res.status(200).json({
    message: "Email sent Successfully.",
  });
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // Mechanic
    if (!user) {
      const mechanic = await Mechanic.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!mechanic) {
        return res.status(400).json({
          message: "Token is invalid or expired. Please try again.",
        });
      }

      const hashpass = await bcrypt.hash(req.body.password, 12);

      mechanic.password = hashpass;
      mechanic.passwordResetToken = undefined;
      mechanic.passwordResetExpires = undefined;
      mechanic.save();
      return res.status(200).json({
        message: "Your Password has been changed successfully.",
      });
    }

    const hashpass = await bcrypt.hash(req.body.password, 12);

    user.password = hashpass;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();
    res.status(200).json({
      message: "Your Password has been changed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    user.isDeleted = true;
    await user.save();

    return res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong." });
  }
};

// Logout user
const logoutUser = (req, res) => {
  try {
    req.user = null;
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
  deleteUser,
  logoutUser,
};
