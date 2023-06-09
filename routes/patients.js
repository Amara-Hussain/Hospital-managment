const express = require("express");
const router = express.Router();
const { Patient, validate } = require("../models/patient");
const { Doctor } = require("../models/doctor");

router.get("/", async (req, res) => {
  const patient = await Patient.findAll();
  res.send(patient);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const doc = await Doctor.findOne({ where: { id: req.body.doctorId } });
    if (!doc) return res.status(400).send("Invalid id");

    const pat = await Patient.create({
      name: req.body.name,
      age: req.body.age,
      wardId: req.body.wardId,
      doctorId: req.body.doctorId,
    });
    res.status(200).send(pat);
  } catch (error) {
    console.error("Creating patient error:", error);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).send("Patient not found");

    await patient.update({
      name: req.body.name,
      age: req.body.age,
      wardId: req.body.wardId,
      doctorId: req.body.doctorId,
    });
    res.status(200).send(patient);
  } catch (error) {
    console.error("Error patient updated :", error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient)
      return res.status(404).send("Patient with given id not found");

    await patient.destroy();
    res.status(200).send("Patient deleted successfully");
  } catch (error) {
    console.error("Error patient delete:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
