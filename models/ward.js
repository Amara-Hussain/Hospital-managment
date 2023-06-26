const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const { Doctor } = require("../models/doctor");

const Ward = sequelize.define("Ward", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    minlength: 5,
    require: true,
  },
  doctorId: {
    type: DataTypes.UUID,
    references: {
      model: Doctor,
      key: "id",
    },
  },
});

function validateWard(ward) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    doctorId: Joi.string().uuid().required(),
  });
  return schema.validate(ward);
}

Ward.beforeCreate((doctor) => {
  doctor.id = uuidv4();
});

module.exports.Ward = Ward;
module.exports.validate = validateWard;
