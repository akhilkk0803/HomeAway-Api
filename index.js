const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const placeRoutes = require("./routes/place");
const multer = require("multer");
const accRoutes = require("./routes/account.js");
const upload = multer();
require("dotenv").config();
const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/auth", authRoutes);
app.use("/place", placeRoutes);
app.use("/account", accRoutes);
app.use((error, req, res, next) => {
  const status = error.status;
  const message = error.message;
  res.status(status).json(message);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mdb"))
  .catch((err) => console.log("error connecting to mdb"));
app.listen(8080, () => {
  console.log("Server is running in port 8080");
});
