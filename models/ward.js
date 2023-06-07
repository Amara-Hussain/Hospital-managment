const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

const Ward = sequelize.define("Ward", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    minlength: 5,
    require: true,
  },
});

function validateDoctor(ward) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
  });
  return schema.validate(ward);
}

Ward.beforeCreate((doctor) => {
  doctor.id = uuidv4();
});

module.exports.Ward = Ward;
module.exports.validate = validateDoctor;
