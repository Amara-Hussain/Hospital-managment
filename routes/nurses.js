const express = require("express");
const router = express.Router();
const { Nurse, validate } = require("../models/nurse");
const { Doctor } = require("../models/doctor");

// Get all Nurses
router.get("/", async (req, res) => {
  try {
    const nurses = await Nurse.findAll({ where: { isActive: true } });
    res.send(nurses);
  } catch (error) {
    console.error("Nurses not found:", error);
    res.status(500).send("Server Error");
  }
});

// Create Nurse
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const doc = await Doctor.findAll({ where: { id: req.body.doctorId } });
  if (!doc) return res.status(400).send("Invalid id");

  try {
    const nurse = await Nurse.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      cnic: req.body.cnic,
      shift: req.body.shift,
      isActive: req.body.isActive,
      doctorId: req.body.doctorId,
    });
    res.status(201).send(nurse);
  } catch (error) {
    console.error("Creating nurse error:", error);
    res.status(500).send("Server Error");
  }
});

//Update Nurse
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const nurse = await Nurse.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        cnic: req.body.cnic,
        shift: req.body.shift,
        isActive: req.body.isActive,
        doctorId: req.body.doctorId,
      },
      { where: { id: req.params.id } }
    );

    if (nurse === 0) {
      return res.status(404).send("Nurse not found");
    }

    res.status(200).send(nurse);
  } catch (error) {
    console.error("Error nurse updated :", error);
    res.status(500).send("Server Error");
  }
});

//status is update with isActive
router.delete("/:id", async (req, res) => {
  try {
    const nurses = await Nurse.findAll({ where: { id: req.params.id } }); 
    if (!nurses.length === 0)
      return res.status(404).send("Nurse with given id not found");

    const nurse = nurses[0];
    await nurse.update({ isActive: false });
    res.status(200).send("Nurse deleted successfully");
  } catch (error) {
    console.error("Error Nurse delete:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
