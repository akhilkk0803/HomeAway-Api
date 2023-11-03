const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ msg: "Validation failed" });
  }
  try {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const hashpw = await bcrypt.hash(password, 12);
    const exuser = await User.findOne({ email });
    if (exuser) {
      return res
        .status(409)
        .json({ msg: "Already exsisting try with another email" });
    }
    const user = await User.create({
      name,
      email,
      password: hashpw,
    });
    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ msg: "Validation failed" });
  }
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ msg: "No user found with this email please register" });
    }
    const pw = await bcrypt.compare(password, user.password);
    console.log(pw);
    if (!pw) {
      res.status(401).json({ msg: "Wrong Password" });
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id, name: user.name },
      "heavySecret"
    );
    res.json({ status: "ok", user, token });
  } catch (e) {}
};
exports.profile = async (req, res, next) => {
  const id = req.userId;
  console.log("fjkslj" + id);
  const user = await User.findById(id);
  res.status(200).json(user);
};
