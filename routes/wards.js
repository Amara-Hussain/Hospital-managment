const express = require("express");
const router = express.Router();
const { Ward, validate } = require("../models/ward");

// Get all wards
router.get("/", async (req, res) => {
  const wards = await Ward.findAll();
  res.send(wards);
});

// Create a new ward
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const ward = await Ward.create({
      name: req.body.name,
    });
    res.status(201).send(ward);
  } catch (error) {
    console.error("Error creating ward", error);
    res.status(500).send("Server error..!!!!!");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const ward = await Ward.findByPk(req.params.id);
    if (!ward) return res.status(404).send("Ward not found");

    await ward.update({
      name: req.body.name,
    });
    res.status(200).send(ward);
  } catch (error) {
    console.error("Error ward updated :", error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ward = await Ward.findByPk(req.params.id);
    if (!ward) return res.status(404).send("ward with given id not found");

    await ward.destroy();
    res.status(200).send("ward deleted successfully");
  } catch (error) {
    console.error("Error ward delete:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
