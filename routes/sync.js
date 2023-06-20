const { Doctor } = require("../models/doctor");
const { Nurse } = require("../models/nurse");
const { Patient } = require("../models/patient");
const { Ward } = require("../models/ward");
const DoctorNurse = require("../models/doctornurse")
const DoctorWard = require("../models/doctorward")
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //syncronize model with database
  try {
    await Doctor.sync({ alter: true });
    await Ward.sync({ alter: true });
    await Nurse.sync({ alter: true });
    await Patient.sync({ alter: true });
    await DoctorNurse.sync({ alter: true });
    await DoctorWard.sync({ alter: true });

    res.send("Succesfully create table in database");
  } catch (error) {
    console.error("Something Failed.....", error);
    res.status(500).send("Internal Server error:");
  }
});

module.exports = router;
