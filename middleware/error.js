// const winston = require("winston");

module.exports = function (err, req, res, next) {
  console.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
};
