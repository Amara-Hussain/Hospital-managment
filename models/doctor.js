const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

const Doctor = sequelize.define("doctor", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    minlength: 5,
    maxlength: 15,
    require: true,
  },
  shift: {
    type: DataTypes.STRING,
    minlength: 3,
    maxlength: 10,
    require: true,
  },
});

function validateDoctor(doctor) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(15).required(),
    shift: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(doctor);
}

Doctor.beforeCreate((doctor) => {
  doctor.id = uuidv4();
});

module.exports.Doctor = Doctor;
module.exports.validate = validateDoctor;
