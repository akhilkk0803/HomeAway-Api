const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Place",
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  name: String,
  phone: String,
  checkIn: Date,
  checkOut: Date,
  price: Number,
  guests: Number,
});

module.exports = mongoose.model("Booking", BookingSchema);
