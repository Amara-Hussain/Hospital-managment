const { Doctor } = require("../models/doctor");
const { Nurse } = require("../models/nurse");
const { Patient } = require("../models/patient");
const { Ward } = require("../models/ward");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //define the association
  // Doctor.hasMany(Nurse, { foreignKey: "doctorId" });
  // Nurse.belongsTo(Doctor, { foreignKey: "doctorId" });

  Doctor.hasMany(Patient, { foreignKey: "doctorId" });
  Patient.belongsTo(Doctor, { foreignKey: "doctorId" });
  Doctor.belongsTo(Ward, { foreignKey: "wardId" });
  Ward.hasMany(Doctor, { foreignKey: "wardId" });
  Ward.hasMany(Patient, { foreignKey: "wardId" });
  Patient.belongsTo(Ward, { foreignKey: "wardId" });

  //syncronize model with database
  try {
    await Doctor.sync();
    await Nurse.sync();
    await Ward.sync();
    await Patient.sync();

    res.send("Succesfully create table in database");
  } catch (error) {
    console.error("Something Failed.....", error);
    res.status(500).send("Internal Server error:");
  }
});

module.exports = router;
