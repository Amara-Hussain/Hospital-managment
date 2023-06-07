const express = require("express");
const router = express.Router();
const { Nurse, validate } = require("../models/nurse");

// Get all nurses
router.get("/", async (req, res) => {
  try {
    const nurses = await Nurse.findAll();
    res.send(nurses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Create a new nurse
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const doc = await doctor.findAll({ where: { id: req.body.doctorid } });
  if (!doc) {
    return res.status(400).send("Invalid id");
  }

  try {
    const nurse = await Nurse.create({
      name: req.body.name,
      shift: req.body.shift,
      doctorId: req.body.doctorId,
    });
    res.status(201).send(nurse);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
