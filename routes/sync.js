const { Doctor } = require("../models/doctor");
const { Nurse } = require("../models/nurse");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //define the association
  Doctor.hasMany(Nurse, { foreignKey: "doctorId" });
  Nurse.belongsTo(Doctor, { foreignKey: "doctorId" });

  //syncronize model with database
  try {
    await Doctor.sync();
    await Nurse.sync();
    // await sequelize.sync({ force: true });
    res.send("Succesfully create table in database");
  } catch (error) {
    console.error("Something Failed.....", error);
    res.status(500).send("Internal Server error:");
  }
});

module.exports = router;
