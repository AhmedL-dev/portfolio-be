const _ = require("lodash");

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = (Model, fields) => {
  return async function (req, res, next) {
    const query = fields.map((field) => {
      return { [field]: req.body[field] };
    });

    const model = await Model.findOne({
      $or: query,
    });

    if (model) {
      let existingField;
      fields.forEach((field) => {
        if (model[field] === req.body[field]) {
          existingField = field;
        }
      });
      return res.status(400).send({
        message: `${existingField.capitalize()} already exists.`,
        key: existingField,
      });
    }
    next();
  };
};
