// doctorWard.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const {Doctor} = require('./doctor');
const {Ward} = require('./ward');

const DoctorWard = sequelize.define('DoctorWard', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    doctorId: {
      type: DataTypes.UUID,
      references: {
        model: Doctor,
        key: 'id',
      },
    },
    wardId: {
      type: DataTypes.UUID,
      references: {
        model: Ward,
        key: 'id',
      },
    },
  });

  function validateDoctorWard(doctorWard) {
    const schema = Joi.object({
      doctorId: Joi.string().uuid().required(),
      wardId: Joi.string().uuid().required(),
    });
  
    return schema.validate(doctorWard);
  }
  
  DoctorWard.beforeCreate((doctorWard) => {
    doctorWard.id = uuidv4();
  });
  
  module.exports = DoctorWard;
  module.exports.validate = validateDoctorWard;
