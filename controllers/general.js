const bcrypt = require("bcrypt");

module.exports.hash = async (hashed) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(hashed, salt);
};
