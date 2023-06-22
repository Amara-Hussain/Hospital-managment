const { Doctor } = require("../models/doctor");
const { Nurse } = require("../models/nurse");
const { Ward } = require("../models/ward");
const { Patient } = require("../models/patient");
const DoctorNurse = require("../models/doctornurse");
const DoctorWard = require("../models/doctorward");
// const sequelize = require("../config/database");
const express = require("express");
const router = express.Router();

router.get("/doctor/:id", async (req, res) => {
  try {
    // Fetch the doctor record along with associated nurse, ward, and patient records
    const doctor = await Doctor.findOne({
      where: { id: req.params.id },
      //attributes:["id"],
      include: [
        {
          model: DoctorNurse,
          as: "DoctorNurses",
          include: [
            {
              model: Nurse,
              as: "Nurses",
              attributes: ["id", "firstname", "lastname", "cnic", "shift"],
            },
          ],
        },
        {
          model: DoctorWard,
          as: "DoctorWards",
          include: [
            {
              model: Ward,
              as: "Wards",
              include: [
                {
                  model: Patient,
                  as: "Patients",
                  attributes: ["id", "firstname", "lastname", "cnic"],
                },
              ],
            },
          ],
        },
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

router.get("/nurse/:id", async (req, res) => {
  try {
    // Fetch the nurse record along with associated doctor, ward, and patient records
    const nurse = await Nurse.findOne({
      where: { id: req.params.id },
      attributes: ["id", "firstname", "lastname", "cnic", "shift"],
      include: [
        {
          model: DoctorNurse,
          as: "DoctorNurses",
          include: [
            {
              model: Doctor,
              as: "Doctor",
              include: [
                {
                  model: DoctorWard,
                  as: "DoctorWards",
                  include: [
                    {
                      model: Ward,
                      as: "Wards",
                      include: [
                        {
                          model: Patient,
                          as: "Patients",
                          attributes: ["id", "firstname", "lastname", "cnic"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!nurse) {
      return res.status(404).send("Nurse not found");
    }

    res.send(nurse);
  } catch (error) {
    console.error("no response", error);
    res.status(500).send("Server Error");
  }
});

router.get("/ward/:id", async (req, res) => {
  try {
    // Fetch the ward record along with associated nurse, doctor, and patient records
    const ward = await Ward.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: DoctorWard,
          as: "DoctorWards",
          include: [
            {
              model: Doctor,
              as: "Doctor",
              include: [
                {
                  model: DoctorNurse,
                  as: "DoctorNurses",
                  include: [
                    {
                      model: Nurse,
                      as: "Nurses",
                      attributes: [
                        "id",
                        "firstname",
                        "lastname",
                        "cnic",
                        "shift",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Patient,
          as: "Patients",
          attributes: ["id", "firstname", "lastname", "cnic"],
        },
      ],
    });

    if (!ward) {
      return res.status(404).send("Ward not found");
    }

    res.send(ward);
  } catch (error) {
    console.error("no response", error);
    res.status(500).send("Server Error");
  }
});

router.get("/patient/:id", async (req, res) => {
  try {
    // Fetch the patient record along with associated ward, doctor, and nurse records
    const patient = await Patient.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Ward,
          as: "Wards",
          include: [
            {
              model: DoctorWard,
              as: "DoctorWards",
              include: [
                {
                  model: DoctorNurse,
                  as: "DoctorNurses",
                  include: [
                    {
                      model: Nurse,
                      as: "Nurses",
                      attributes: [
                        "id",
                        "firstname",
                        "lastname",
                        "cnic",
                        "shift",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.send(patient);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
