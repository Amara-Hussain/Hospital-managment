const express = require("express");
const router = express.Router();
const { Patient, validate } = require("../models/patient");
const { Ward } = require("../models/ward");
// const { Doctor } = require("../models/doctor");

router.get("/", async (req, res) => {
  try {
    const patient = await Patient.findAll();
    res.send(patient);
  } catch (error) {
    console.error("Patient not found:", error);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const ward = await Ward.findAll({ where: { id: req.body.wardId } });
    if (!ward) return res.status(400).send("Invalid id");

    const patient = await Patient.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      cnic: req.body.cnic,
      wardId: req.body.wardId,
    });
    res.status(200).send(patient);
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
    if (!patient.length === 0) return res.status(404).send("Patient not found");

    await patient.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      cnic: req.body.cnic,
      wardId: req.body.wardId,
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
    if (!patient.length === 0)
      return res.status(404).send("Patient with given id not found");

    await patient.destroy();
    res.status(200).send("Patient deleted successfully");
  } catch (error) {
    console.error("Error patient delete:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
