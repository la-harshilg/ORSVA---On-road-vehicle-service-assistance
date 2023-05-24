const Mechanic = require("../models/mechanic.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Register Mechanic
const registerMechanic = async (req, res) => {
  try {
    const { name, email, address, mobile, password } = req.body;
    const mechanicExists = await Mechanic.findOne({ email });
    if (mechanicExists) {
      throw new Error("Mechanic with email already exists.");
    }

    if (!password) {
      throw new Error("Password is required.");
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const mechanic = new Mechanic({
      name,
      email,
      address,
      mobile,
      password: hashPassword,
      profileImg: req.file.location,
    });

    await mechanic.save();
    const token = await mechanic.generateAuthToken();
    return res.status(201).json({
      mechanic: mechanic.toJSON(),
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

// Login Mechanic
const loginMechanic = async (req, res) => {
  try {
    const { email, password } = req.body;
    const mechanic = await Mechanic.findByCredentials(email, password);
    const token = await mechanic.generateAuthToken();
    return res.status(200).json({
      mechanic: mechanic.toJSON(),
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Mechanic Profile
const getProfile = (req, res) => {
  try {
    const mechanic = req.mechanic;
    return res.status(200).json({
      mechanic,
    });
  } catch (error) {
    return res.status(404).json({ error: "Mechanic not found." });
  }
};

// Delete Mechanic
const deleteMechanic = async (req, res) => {
  try {
    const mechanic = req.mechanic;

    mechanic.isDeleted = true;
    await mechanic.save();

    return res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong." });
  }
};

// Logout Mechanic
const logoutMechanic = (req, res) => {
  try {
    req.mechanic = null;
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get Nearby Mechanics
const getNearbyMechanics = async (req, res) => {
  const page = parseInt(req.query.page);
  const skipIndex = (page - 1) * 6;

  try {
    const { lat, lng } = req.query;
    const mechanics = await Mechanic.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, lng],
          },
        },
      },
    })
      .limit(6)
      .skip(skipIndex);

    const allmechanics = await Mechanic.find({});
    return res
      .status(200)
      .json({ mechanics: mechanics, length: allmechanics.length });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllMechanics = async (req, res) => {
  const page = parseInt(req.query.page);
  const skipIndex = (page - 1) * 6;

  try {
    const mechanics = await Mechanic.find({}).limit(6).skip(skipIndex);

    const allmechanics = await Mechanic.find({});
    return res
      .status(200)
      .json({ mechanics: mechanics, length: allmechanics.length });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerMechanic,
  loginMechanic,
  getProfile,
  deleteMechanic,
  logoutMechanic,
  getNearbyMechanics,
  getAllMechanics,
};
