const nodemailer = require("nodemailer");

const sendMail = async (email, message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  let mailDetails = {
    from: `ORSVA <${process.env.GOOGLE_USER}>`,
    to: email,
    subject: "ORSVA - Reset Password",
    text: `${message} This link is valid for only 10 minutes and Please don't share this mail with anyone.`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully.");
    }
  });
};

const sendCreateRequestMail = async (email, message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  let mailDetails = {
    from: `ORSVA <${process.env.GOOGLE_USER}>`,
    to: email,
    subject: "ORSVA - Request Created",
    text: `${message}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully.");
    }
  });
};

const sendAcceptRequestMail = async (email, message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  let mailDetails = {
    from: `ORSVA <${process.env.GOOGLE_USER}>`,
    to: email,
    subject: "ORSVA - Request Accepted by Mechanic",
    text: `${message}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully.");
    }
  });
};

const sendRequestCompletedMail = async (email, message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  let mailDetails = {
    from: `ORSVA <${process.env.GOOGLE_USER}>`,
    to: email,
    subject: "ORSVA - Request Completed",
    text: `${message}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully.");
    }
  });
};

const sendRequestCancelledMail = async (email, message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  let mailDetails = {
    from: `ORSVA <${process.env.GOOGLE_USER}>`,
    to: email,
    subject: "ORSVA - Request Cancelled",
    text: `${message}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully.");
    }
  });
};

module.exports = {
  sendMail,
  sendCreateRequestMail,
  sendAcceptRequestMail,
  sendRequestCompletedMail,
  sendRequestCancelledMail,
};
