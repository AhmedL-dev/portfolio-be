const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: String,
  password: String,
  roles: {
    type: [String],
    enum: config.get("userRoles"),
    default: ["user"],
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      username: this.username,
      email: this.email,
      roles: this.roles
    },
    config.get("jwt-private-key"),
    {
      expiresIn: config.get("jwt-expires-in"),
    }
  );
  return token;
};

User = new mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = {
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    roles: Joi.array().items(
      Joi.string().valid(config.get("userRoles")).required()
    ),
  };
  return Joi.validate(user, schema);
};

function validateAuth(req) {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validate(req, schema);
}

module.exports.User = User;
module.exports.validateUser = validate;
module.exports.validateAuth = validateAuth;
