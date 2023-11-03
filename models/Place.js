const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  title: String,
  type: String,
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extra: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number,
});

module.exports = mongoose.model("Place", PlaceSchema);
