const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const { Ward } = require("./ward");
const { Doctor } = require("./doctor");

const Patient = sequelize.define("Patient", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    minlength: 5,
    maxlength: 10,
    require: true,
  },
  age: {
    type: DataTypes.INTEGER,
    require: true,
  },
  wardId: {
    type: DataTypes.UUID,
    references: {
      model: Ward,
      key: "id",
    },
  },
  doctorId: {
    type: DataTypes.UUID,
    references: {
      model: Doctor,
      key: "id",
    },
  },
});

function validateDoctor(patient) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(15).required(),
    age: Joi.number().required(),
    wardId: Joi.string().required(),
    doctorId: Joi.string().required(),
  });
  return schema.validate(patient);
}

Patient.beforeCreate((doctor) => {
  doctor.id = uuidv4();
});

module.exports.Patient = Patient;
module.exports.validate = validateDoctor;
