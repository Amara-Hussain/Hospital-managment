const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const { Doctor } = require("./doctor");

const Nurse = sequelize.define("Nurse", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true, //create for unique id
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
  doctorId: {
    type: DataTypes.UUID,
    references: {
      model: Doctor,
      key: "id",
    },
  },
  fullname: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
});

function validateNurse(nurse) {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(15).required(),
    lastname: Joi.string().min(3).max(15).required(),
    cnic: Joi.string().pattern(/^\d{5}-\d{7}-\d$/).required(),
    shift: Joi.string().min(3).max(10).required(),
    isActive: Joi.boolean().required(),
    doctorId: Joi.string().pattern(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).required(),
  });

  return schema.validate(nurse);
}

Nurse.beforeCreate((nurse) => {
  nurse.id = uuidv4();
});

module.exports.Nurse = Nurse;
module.exports.validate = validateNurse;
