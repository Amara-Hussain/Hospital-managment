const doctor = require("../routes/doctors");
const nurse = require("../routes/nurses");
const patient = require("../routes/patients");
const ward = require("../routes/wards");
const sync = require("../routes/sync");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/doctors", doctor);
  app.use("/api/nurses", nurse);
  app.use("/api/patients", patient);
  app.use("/api/wards", ward);
  app.use("/api/sync", sync);
};
