const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");
const secretKey = "heavySecret";

exports.getBookings = async (req, res, next) => {
  const id = req.userId;
  try {
    const data = await Booking.find({ user: id }).populate("place");
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occured");
  }
};
exports.getBooking = async (req, res, next) => {
  const { id } = req.params;
  const data = await Booking.findById(id).populate("place");
  if (!data) {
    res.status(500).json("An error occurred");
  }
  res.status(200).json(data);
};
exports.DeleteBooking = async (req, res, next) => {
  const { id } = req.params;
  const data = await Booking.findByIdAndDelete(id);
  res.status(200).json("Deleted");
};
