const { User } = require("../models/user");
const { hash } = require("./general");
const bcrypt = require("bcrypt");
const _ = require("lodash");

module.exports.registerUser = async function (req) {
  const user = new User(_.pick(req.body, ["username", "email", "password"]));
  user.password = await hash(req.body.password);

  await user.save();
  return user;
};

module.exports.validateCredentials = async function (req, res, next) {
  let user = await User.findOne({ username: req.body.username });
  if (!user)
    return res
      .status(400)
      .send({ message: "Invalid username.", key: "username" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .send({ message: "Invalid password.", key: "password" });

  req.user = user;
  next();
};
