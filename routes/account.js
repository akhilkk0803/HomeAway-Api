const express = require("express");
const router = express.Router();
const isauth = require("../middleware/is-auth");

const AccountController = require("../controllers/account");
router.get("/bookings", isauth, AccountController.getBookings);
router.get("/bookings/:id", isauth, AccountController.getBooking);
router.delete("/booking/:id", isauth, AccountController.DeleteBooking);

module.exports = router;
