const express = require("express");
const router = express.Router();
const { Nurse, validate } = require("../models/nurse");
const { Doctor } = require("../models/doctor");

// Get all nurses
router.get("/", async (req, res) => {
  const nurses = await Nurse.findAll();
  res.send(nurses);
});

// Create a new nurse
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const doc = await Doctor.findOne({ where: { id: req.body.doctorId } });
  if (!doc) return res.status(400).send("Invalid id");

  try {
    const nurse = await Nurse.create({
      name: req.body.name,
      shift: req.body.shift,
      doctorId: req.body.doctorId,
    });
    res.status(201).send(nurse);
  } catch (error) {
    console.error("Creating nurse error:", error);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const nurse = await Nurse.findByPk(req.params.id);
    if (!nurse) return res.status(404).send("Nurse not found");

    await nurse.update({
      name: req.body.name,
      shift: req.body.shift,
      doctorId: req.body.doctorId,
    });
    res.status(200).send(nurse);
  } catch (error) {
    console.error("Error updated nurse:", error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const nurseId = req.params.id;
  try {
    const nurse = await Nurse.findByPk(nurseId);
    if (!nurse) return res.status(404).send("Nurse not found");

    await nurse.destroy();
    res.status(200).send("Nurse deleted successfully");
  } catch (error) {
    console.error("Error nurse Delete:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
