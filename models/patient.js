const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const { Ward } = require("./ward");

const Patient = sequelize.define("Patient", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    minlength: 3,
    maxlength: 15,
    require: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    minlength: 3,
    maxlength: 15,
    require: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
  cnic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{5}-\d{7}-\d$/,
    },
  },
  wardId: {
    type: DataTypes.UUID,
    references: {
      model: Ward,
      key: "id",
    },
  },
});

function validateDoctor(patient) {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(15).required(),
    lastname: Joi.string().min(3).max(15).required(),
    age: Joi.number().required(),
    cnic: Joi.string().pattern(/^\d{5}-\d{7}-\d$/).required(),
    wardId: Joi.string().uuid().required(),
  });
  return schema.validate(patient);
}

Patient.beforeCreate((doctor) => {
  doctor.id = uuidv4();
});

module.exports.Patient = Patient;
module.exports.validate = validateDoctor;
