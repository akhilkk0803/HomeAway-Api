const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const placeRoutes = require("./routes/place");
const multer = require("multer");
const accRoutes = require("./routes/account.js");
const upload = multer();
const download = require("image-downloader");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/place/upload-by-link", async (req, res, next) => {
  const { img } = req.body;
  const newname = "photo" + Date.now() + ".jpg";
  const options = {
    url: img,
    dest: __dirname + "/uploads/" + newname,
  };
  try {
    const fname = await download.image(options);
    res.json(newname);
    console.log("saved to ", fname);
  } catch (e) {
    console.log("Error downloading file", e);
  }
});
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
  const name = __dirname;
  console.log(name);
  console.log("Server is running in port 8080");
});
