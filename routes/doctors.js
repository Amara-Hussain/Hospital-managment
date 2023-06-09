const express = require("express");
const router = express.Router();
const { Doctor, validate } = require("../models/doctor");

router.get("/", async (req, res) => {
  const doctor = await Doctor.findAll();
  res.send(doctor);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const doc = await Doctor.create({
      name: req.body.name,
      shift: req.body.shift,
    });
    res.status(200).send(doc);
  } catch (error) {
    console.error("Creating doctor error:", error);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).send("Doctor not found");

    await doctor.update({
      name: req.body.name,
      shift: req.body.shift,
    });
    res.status(200).send(doctor);
  } catch (error) {
    console.error("Error doctor updated :", error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).send("Doctor with given id not found");

    await doctor.destroy();
    res.status(200).send("Doctor deleted successfully");
  } catch (error) {
    console.error("Error Doctor delete:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
