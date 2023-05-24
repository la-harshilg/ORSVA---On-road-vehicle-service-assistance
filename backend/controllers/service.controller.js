const Service = require("../models/service.model");

// Add Service
const addService = async (req, res) => {
  try {
    const { name, amount, description } = req.body;
    const mechanic = req.mechanic;

    const service = new Service({
      name,
      amount,
      description,
      mechanic: mechanic._id,
    });

    await service.save();
    await service.populate({
      path: "mechanic",
      select: "name email",
    });

    // Adding car to user
    const updateServices = [...mechanic.services, service];
    req.mechanic.services = updateServices;
    await req.mechanic.save();

    return res
      .status(201)
      .json({ message: `Service with id ${service._id} add successfully.` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) throw new Error("Service not found.");

    const updateServices = req.mechanic.services.filter((service) => {
      return service._id != req.params.serviceId;
    });

    req.mechanic.services = updateServices;
    await req.mechanic.save();
    await Service.updateOne({ _id: req.params.serviceId }, { isDeleted: true });
    res.send({
      status: "success",
      message: `Service with id ${service._id} is deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

// Get by mechanic for mechanic
const getServicesbymechanic = async (req, res) => {
  const page = parseInt(req.query.page);
  const skipIndex = (page - 1) * 5;

  try {
    const services = await Service.find({
      mechanic: req.mechanic._id,
      isDeleted: false,
    })
      .sort({ amount: 1 })
      .limit(5)
      .skip(skipIndex);
    const allServices = await Service.find({
      mechanic: req.mechanic._id,
      isDeleted: false,
    });
    return res
      .status(200)
      .json({ services: services, length: allServices.length });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

// For user side
const getMechanicServices = async (req, res) => {
  const page = parseInt(req.query.page);
  const skipIndex = (page - 1) * 5;

  try {
    const services = await Service.find({
      mechanic: req.params.mechId,
      isDeleted: false,
    })
      .sort({ amount: 1 })
      .limit(5)
      .skip(skipIndex);

    // For length
    const allServices = await Service.find({
      mechanic: req.params.mechId,
      isDeleted: false,
    });

    return res
      .status(200)
      .json({ services: services, length: allServices.length });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addService,
  deleteService,
  getServicesbymechanic,
  getMechanicServices,
};
