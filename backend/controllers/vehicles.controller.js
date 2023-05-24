const Vehicle = require("../models/vehicle.model");

// Adding Vehicle
const addVehicle = async (req, res) => {
  try {
    const { modelname, carno } = req.body;
    const user = req.user;

    if (!modelname || !carno) {
      throw new Error("Please enter ModelName and Car Number.");
    }

    const existingVehicle = await Vehicle.findOne({
      carno,
    });

    if (existingVehicle) {
      throw new Error("This vehicle is already added.");
    }

    const vehicle = new Vehicle({
      modelname,
      carno,
      user: user._id,
    });

    await vehicle.save();
    await vehicle.populate({
      path: "user",
      select: "name email -_id",
    });

    // Adding car to user
    const updateVehicles = [...user.vehicles, vehicle];
    req.user.vehicles = updateVehicles;
    await req.user.save();

    return res
      .status(201)
      .json({ message: `Vehicle (${vehicle.carno}) added successfully.` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Select Vehicle
const selectPrimaryVehicle = async (req, res) => {
  try {
    // const vehicle = req.user.vehicles.find((vehicle) => {
    //   return vehicle._id == req.params.vehicleId;
    // });
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicleId,
      user: req.user._id,
      isDeleted: false,
    });

    if (!vehicle) throw new Error("Vehicle not found");
    req.user.vehicle = req.params.vehicleId;
    await req.user.save();
    await req.user.populate({
      path: "vehicle",
      select: "modelname carno",
    });
    return res.send({
      message: `${vehicle.carno} is as selected primary vehicle.`,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Delete Vehicle
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicleId,
      isDeleted: false,
    });
    if (!vehicle) throw new Error("Vehicle not found.");

    const vehicles = await Vehicle.find({
      user: req.user._id,
      isDeleted: false,
    });

    if (vehicles.length === 1)
      throw new Error("You can not delete. Atleast One Vehicle is required.");

    // const updatedVehicles = req.user.vehicles.filter((vehicle) => {
    //   return vehicle._id != req.params.vehicleId;
    // });

    const updatedVehicles = await Vehicle.find({
      _id: { $ne: req.params.vehicleId },
      user: req.user._id,
      isDeleted: false,
    });

    console.log(req.user.vehicle);
    console.log(updatedVehicles[0]);

    if (req.user.vehicle._id == req.params.vehicleId) {
      req.user.vehicle = updatedVehicles[0];
    }

    console.log(req.user.vehicle);

    req.user.vehicles = updatedVehicles;
    vehicle.isDeleted = true;
    await req.user.save();
    await vehicle.save();
    res.send({
      message: `Vehicle (${vehicle.carno}) is deleted successfully.`,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const getVehiclesbyuser = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      user: req.user._id,
      isDeleted: false,
    });
    return res.status(200).json({
      vehicles,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addVehicle,
  selectPrimaryVehicle,
  deleteVehicle,
  getVehiclesbyuser,
};
