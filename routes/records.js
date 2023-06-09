const { Doctor } = require("../models/doctor");
const { Nurse } = require("../models/nurse");
const { Ward } = require("../models/ward");
const { Patient } = require("../models/patient");
const express = require("express");
const router = express.Router();

Doctor.hasMany(Nurse, { foreignKey: "doctorId" });
Nurse.belongsTo(Doctor, { foreignKey: "doctorId" });

Doctor.hasMany(Ward, { foreignKey: "doctorId" });
Ward.belongsTo(Doctor, { foreignKey: "doctorId" });

Doctor.hasMany(Patient, { foreignKey: "doctorId" });
Patient.belongsTo(Doctor, { foreignKey: "doctorId" });

Ward.hasMany(Patient, { foreignKey: "wardId" });
Patient.belongsTo(Ward, { foreignKey: "wardId" });

router.get("/:id", async (req, res) => {
  try {
    // Fetch the doctor record along with associated nurse, ward, and patient records
    const doctor = await Doctor.findOne({
      where: { id: req.params.id },
      include: [
        { model: Nurse },
        { model: Ward, include: [{ model: Patient }] },
      ],
    });

    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    res.send(doctor);
  } catch (error) {
    console.error("no response", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

//include: [{ model: Nurse }, { model: Ward }, { model: Patient }],
