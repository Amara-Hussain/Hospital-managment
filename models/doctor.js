const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

const Doctor = sequelize.define("Doctor", {
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
  cnic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{5}-\d{7}-\d$/,
    },
  },
  shift: {
    type: DataTypes.STRING,
    allowNull: false,
    minlength: 3,
    maxlength: 10,
    require: true, 
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    require: true,
    allowNull: false,
  },
});

function validateDoctor(doctor) {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(15).required(),
    lastname: Joi.string().min(3).max(15).required(),
    cnic: Joi.string().pattern(/^\d{5}-\d{7}-\d$/).required(),
    shift: Joi.string().min(3).max(10).required(),
    isActive: Joi.boolean().required(),
  }).custom((value) => {
    value.isActive = value.isActive === true;
    return value;
  });
  return schema.validate(doctor);
}

Doctor.beforeCreate((doctor) => {
  doctor.id = uuidv4();
});

module.exports.Doctor = Doctor;
module.exports.validate = validateDoctor;
