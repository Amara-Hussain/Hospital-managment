const express = require("express");
const router = express.Router();
const { Doctor, validate } = require("../models/doctor");
const DoctorNurse = require("../models/doctornurse")
const DoctorWard = require("../models/doctorward")

//get all doctor
router.get("/", async (req, res) => {
  try {
    const doctor = await Doctor.findAll({ where: { isActive: true } });
    res.send(doctor);
  } catch (error) {
    console.error("Doctor not found:", error);
    res.status(500).send("Server Error");
  }
});

//create doctor
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const doc = await Doctor.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      cnic: req.body.cnic,
      shift: req.body.shift,
      isActive: req.body.isActive,
    });
    res.status(200).send(doc);
  } catch (error) {
    console.error("Creating doctor error:", error);
    res.status(500).send("Server Error");
  }
});

//update doctor
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const doctor = await Doctor.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        cnic: req.body.cnic,
        shift: req.body.shift,
        isActive: req.body.isActive,
      },
      { where: { id: req.params.id } }
    );

    if (doctor === 0) {
      return res.status(404).send("Doctor not found");
    }

    res.status(200).send(doctor);
  } catch (error) {
    console.error("Error doctor updated :", error);
    res.status(500).send("Server Error");
  }
});

//
router.delete("/:id", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({ where: { id: req.params.id } });
    if (!doctors.length === 0)
      return res.status(404).send("Doctor with given id not found");

    const doctor = doctors[0];
    await doctor.update({ isActive: false });

    res.status(200).send("Doctor deleted successfully");
  } catch (error) {
    console.error("Error Doctor delete:", error);
    res.status(500).send("Server Error");
  }
});

//POST request for creating a DoctorNurse association
router.post("/doctor-nurse", async (req, res) => {
  try {
    const { doctorId, nurseId } = req.body;

    // Create the DoctorNurse association
    await DoctorNurse.create({ doctorId, nurseId });

    res.status(201).send("DoctorNurse association created successfully");
  } catch (error) {
    console.error("Error creating DoctorNurse association", error);
    res.status(500).send("Server Error");
  }
});

// POST request for creating a DoctorWard association
router.post("/doctor-ward", async (req, res) => {
  try {
    const { doctorId, wardId } = req.body;

    // Create the DoctorWard association
    await DoctorWard.create({ doctorId, wardId });

    res.status(201).send("DoctorWard association created successfully");
  } catch (error) {
    console.error("Error creating DoctorWard association", error);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
