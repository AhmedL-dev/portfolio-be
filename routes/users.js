const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const _ = require("lodash");
const validate = require("../middleware/validate");

router.get("/", async (req, res) => {
  users = await User.find();
  res.send(users);
});

router.post("/", validate(validateUser), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  res.send(_.pick(user, ["_id", "username", "email"]));
});

module.exports = router;
