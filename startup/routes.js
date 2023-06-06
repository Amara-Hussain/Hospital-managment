const doctor = require("../routes/doctors");
const nurse = require("../routes/nurses");
const sync = require("../routes/sync");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/doctors", doctor);
  app.use("/api/nusres", nurse);
  app.use("/api/sync", sync);
};
