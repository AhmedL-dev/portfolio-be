const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { registerUser, validateCredentials } = require("../controllers/auth");

const { User, validateUser, validateAuth } = require("../models/user");
const validate = require("../middleware/validate");
const exists = require("../middleware/exists");

router.post(
  "/login",
  [validate(validateAuth), validateCredentials],
  async (req, res) => {
    const token = req.user.generateAuthToken();
    res.send(token);
  }
);

router.post(
  "/register",
  [validate(validateUser), exists(User, ["email", "username"])],
  async (req, res) => {
    const user = await registerUser(req);
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "username", "email"]));
  }
);

module.exports = router;
