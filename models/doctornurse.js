// doctorNurse.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const {Doctor} = require('./doctor');
const {Nurse} = require('./nurse');

const DoctorNurse = sequelize.define('DoctorNurse', {
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
    nurseId: {
      type: DataTypes.UUID,
      references: {
        model: Nurse,
        key: 'id',
      },
    },
  });

  function validateDoctorNurse(doctorNurse) {
    const schema = Joi.object({
      doctorId: Joi.string().uuid().required(),
      nurseId: Joi.string().uuid().required(),
    });
  
    return schema.validate(doctorNurse);
  }
  
  DoctorNurse.beforeCreate((doctorNurse) => {
    doctorNurse.id = uuidv4();
  });
  
  module.exports = DoctorNurse;
  module.exports.validate = validateDoctorNurse;
