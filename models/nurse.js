const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const { Doctor } = require("./doctor");

const Nurse = sequelize.define("nurse", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    minlength: 5,
    maxlength: 15,
    require: true,
  },
  shift: {
    type: DataTypes.STRING,
    minlength: 5,
    maxlength: 10,
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

function validateDoctor(nurse) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(15).required(),
    shift: Joi.string().min(3).max(10).required(),
    doctorId: Joi.string().required(),
  });

  return schema.validate(nurse);
}

Nurse.beforeCreate((doctor) => {
  doctor.id = uuidv4();
});

// Nurse.belongsTo(Doctor, {
//   foreignKey: 'doctorId',
//   onDelete: 'CASCADE'
// });

module.exports.Nurse = Nurse;
module.exports.validate = validateDoctor;
