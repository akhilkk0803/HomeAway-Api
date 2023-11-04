const express = require("express");
const router = express.Router();
const multer = require("multer");
const isauth = require("../middleware/is-auth");
const PlaceController = require("../controllers/place");
const { body } = require("express-validator");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const arr = file.originalname.split(".");

    const newname =
      "photo" + Math.random() + Date.now() + "." + arr[arr.length - 1];
    cb(null, newname);
  },
});
const upload = multer({ storage: storage });
router.post("/upload", upload.array("photos", 100), PlaceController.upload);
router.post(
  "/new",
  isauth,
  [
    body("address").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("checkIn").trim().notEmpty(),
    body("checkOut").trim().notEmpty(),
    body("extra").trim().notEmpty(),
    body("title").trim().notEmpty(),
    body("addedPhotos").isArray({
      min: 3,
    }),
  ],
  PlaceController.addPlace
);
router.put(
  "/new",
  isauth,
  [
    body("address").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("checkIn").trim().notEmpty(),
    body("checkOut").trim().notEmpty(),
    body("extra").trim().notEmpty(),
    body("title").trim().notEmpty(),
    body("addedPhotos").isArray({
      min: 3,
    }),
  ],

  PlaceController.updatePlace
);
router.delete("/:id", isauth, PlaceController.deletePlace);
router.get("/", isauth, PlaceController.getplaces);
router.get("/:id", isauth, PlaceController.getPlace);
router.post("/booking", isauth, PlaceController.BookPlace);

module.exports = router;
