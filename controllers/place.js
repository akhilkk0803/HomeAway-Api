const Place = require("../models/Place");
const Booking = require("../models/Booking");

exports.upload = async (req, res, next) => {
  console.log("first");
  //   const { file } = req.body;
  console.log(req.files);
  //   console.log(file);
  const filename = req.files.map((el) => el.filename);
  res.json(filename);
};
exports.getplaces = async (req, res, next) => {
  const { q } = req.query;
  console.log(q);
  if (q === "userPost") {
    const userId = req.userId;
    const places = await Place.find({
      owner: userId,
    });
    res.json(places);
  } else if (q === "All") {
    res.json(await Place.find());
  } else {
    res.json(await Place.find({ type: q }));
  }
};
exports.addPlace = async (req, res, next) => {
  console.log("first");
  const userId = req.userId;
  const {
    title,
    type,
    address,
    description,
    perks,
    checkIn,
    checkOut,
    guests,
    extra,
    price,
    addedPhotos,
  } = req.body;

  const doc = await Place.create({
    owner: userId,
    title,
    type,
    address,
    description,
    perks,
    checkIn,
    checkOut,
    maxGuests: guests,
    extra,
    price,
    photos: addedPhotos,
  });
  res.json(doc);
};
exports.updatePlace = async (req, res, next) => {
  console.log("updataed");
  const {
    title,
    type,
    address,
    description,
    perks,
    checkIn,
    checkOut,
    guests,
    extra,
    addedPhotos,
    price,
    id,
  } = req.body;
  console.log(extra);
  const data = await Place.findByIdAndUpdate(
    id,
    {
      title,
      type,
      address,
      description,
      perks,
      checkIn,
      checkOut,
      maxGuests: guests,
      extra,
      photos: addedPhotos,
      price,
    },
    { new: true }
  );
  console.log("dat", data);
  res.json(data);
};
exports.deletePlace = async (req, res, next) => {
  const { id } = req.params;
  console.log("del", id);
  await Place.findByIdAndDelete(id);
  res.json("deleted");
};
exports.getPlace = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const place = await Place.findOne({ _id: id }).populate("owner").exec();
  res.json(place);
};
exports.BookPlace = async (req, res, next) => {
  const { name, id, phone, checkIn, checkOut, price, guests } = req.body;
  const userid = req.userId;
  try {
    const data = await Booking.create({
      place: id,
      user: userid,
      phone,
      checkIn: checkIn,
      checkOut: checkOut,
      price,
      name,
      guests,
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json("An error occured");
  }
};
