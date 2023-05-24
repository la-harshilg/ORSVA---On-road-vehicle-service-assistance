const Request = require("../models/request.model");

const {
  sendCreateRequestMail,
  sendAcceptRequestMail,
  sendRequestCompletedMail,
  sendRequestCancelledMail,
} = require("../utils/sendMail");

// Request a service
const createRequest = async (req, res) => {
  try {
    const {
      description,
      service,
      mechanic,
      reqLoc,
      billAmount,
      payment_mode,
    } = req.body;

    const newReq = new Request({
      description,
      reqLoc,
      service,
      mechanic,
      billAmount,
      payment_mode,
      reqTime: Date.now(),
      vehicle: req.user.vehicle._id,
      user: req.user._id,
    });

    await newReq.save();
    const requestMessage = `Your request for <b>Request ID : </b>#${newReq._id} is created successfully.</br>Description: ${newReq.description}`;
    sendCreateRequestMail(req.user.email, requestMessage);

    return res.status(201).json({
      message: "Request created successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Request Details
const requestbyId = async (req, res) => {
  try {
    const request = await Request.findOne({ _id: req.params.id }).populate(
      "service mechanic vehicle user"
    );
    return res.status(200).json({ request });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Get Mechanic Pending Requests
const getPendingRequests = async (req, res) => {
  const page = parseInt(req.query.page);
  const skipIndex = (page - 1) * 5;
  try {
    const requests = await Request.find({
      mechanic: req.mechanic._id,
      status: "pending",
    })
      .populate("user service vehicle")
      .skip(skipIndex)
      .sort({ reqTime: -1 })
      .limit(5);

    const totalReq = (
      await Request.find({ mechanic: req.mechanic._id, status: "pending" })
    ).length;

    return res.status(200).json({ requests, totalReq });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// User Requests
const getUserRequests = async (req, res) => {
  const page = parseInt(req.query.page);
  const skipIndex = (page - 1) * 5;
  try {
    const myrequests = await Request.find({
      user: req.user._id,
    })
      .populate("service mechanic vehicle")
      .skip(skipIndex)
      .limit(5)
      .sort({ reqTime: -1 });
    const totalReq = (await Request.find({ user: req.user._id })).length;

    return res.status(200).json({ requests: myrequests, length: totalReq });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Mechanic All Requests
const mechanicRequests = async (req, res) => {
  const page = parseInt(req.query.page);
  const skipIndex = (page - 1) * 5;
  try {
    const requests = await Request.find({ mechanic: req.mechanic._id })
      .populate("user vehicle service")
      .skip(skipIndex)
      .sort({ reqTime: -1 })
      .limit(5);

    const totalReq = (await Request.find({ mechanic: req.mechanic._id }))
      .length;

    return res.status(200).json({ requests, totalReq });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

//Total Requests and Approved Requests
const totalRequests = async (req, res) => {
  try {
    const totalRequests = (await Request.find({ mechanic: req.mechanic._id }))
      .length;
    const totalPendingRequests = (
      await Request.find({ mechanic: req.mechanic._id, status: "pending" })
    ).length;

    const totalInprogressRequests = (
      await Request.find({ mechanic: req.mechanic._id, status: "inprogress" })
    ).length;

    const totalApprovedRequests = (
      await Request.find({ mechanic: req.mechanic._id, status: "completed" })
    ).length;

    const totalCancelledRequests = (
      await Request.find({ mechanic: req.mechanic._id, status: "cancelled" })
    ).length;

    return res.status(200).json({
      totalRequests,
      totalPendingRequests,
      totalInprogressRequests,
      totalApprovedRequests,
      totalCancelledRequests,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// WeekDay wise requests
const weekwiseRequests = async (req, res) => {
  try {
    const requests = await Request.find({ mechanic: req.mechanic._id }).select(
      "reqTime"
    );

    const weekwise = requests.map((request) =>
      request.reqTime.toLocaleString("en-US", {
        weekday: "long",
      })
    );
    const norequests = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    for (const day of weekwise) {
      norequests[day] = norequests[day] ? norequests[day] + 1 : 1;
    }

    return res.status(200).json({ data: norequests });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Updating Requests Status
const updateStatusRequests = async (req, res) => {
  try {
    const { status } = req.body;

    const currentRequest = await Request.findOne({
      _id: req.params.id,
    }).populate("user mechanic");

    if (status === "inprogress") {
      await Request.updateOne(
        { _id: req.params.id },
        {
          status,
        }
      );
      const mailmessage = `Your request with <b>Request ID: </b>${currentRequest._id}  is accepted by ${currentRequest.mechanic.name} and your request is In Progress.`;
      sendAcceptRequestMail(currentRequest.user.email, mailmessage);
      return res
        .status(200)
        .json({ message: `Request: ${req.params.id}  accepted.` });
    } else if (status === "completed") {
      await Request.updateOne(
        { _id: req.params.id },
        {
          status,
        }
      );
      const mailmessage = `Your request with <b>Request ID: </b>${currentRequest._id}  is successfully completed by ${currentRequest.mechanic.name}.`;
      sendRequestCompletedMail(currentRequest.user.email, mailmessage);
      return res.status(200).json({ message: "Request Completed" });
    } else if (status === "cancelled") {
      await Request.updateOne(
        { _id: req.params.id },
        {
          status,
        }
      );
      const mailmessage = `Your request with <b>Request ID: </b>${currentRequest._id}  is cancelled.`;
      sendRequestCancelledMail(currentRequest.user.email, mailmessage);
      return res.status(200).json({ message: "Request Cancelled" });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createRequest,
  requestbyId,
  getPendingRequests,
  getUserRequests,
  mechanicRequests,
  totalRequests,
  updateStatusRequests,
  weekwiseRequests,
};
