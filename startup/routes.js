const users = require("../routes/users");
const auth = require("../routes/auth");
const express = require("express");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use(express.json());
  app.use("/users", users);
  app.use("/auth", auth);
  app.use(error);
};
