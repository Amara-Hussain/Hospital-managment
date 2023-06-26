const { Doctor } = require("../models/doctor");
const { Nurse } = require("../models/nurse");
const { Ward } = require("../models/ward");
const { Patient } = require("../models/patient");
const DoctorNurse = require("../models/doctornurse");
const DoctorWard = require("../models/doctorward");

module.exports = function () {
  // Doctor and Nurse Association with DoctorNurse junction table
  Doctor.hasMany(DoctorNurse, { foreignKey: "doctorId", as: "DoctorNurses" });
  DoctorNurse.belongsTo(Doctor, { foreignKey: "doctorId", as: "Doctors" });

  // Nurse and Doctor Association with DoctorNurse junction table
  Nurse.hasMany(DoctorNurse, { foreignKey: "nurseId", as: "DoctorNurses" });
  DoctorNurse.belongsTo(Nurse, { foreignKey: "nurseId", as: "Nurses" });

  // Doctor and Ward Association with DoctorWard junction table
  Doctor.hasMany(DoctorWard, { foreignKey: "doctorId", as: "DoctorWards" });
  DoctorWard.belongsTo(Doctor, { foreignKey: "doctorId", as: "Doctors" });

  // Ward and Doctor Association with DoctorWard junction table
  Ward.hasMany(DoctorWard, { foreignKey: "wardId", as: "DoctorWards" });
  DoctorWard.belongsTo(Ward, { foreignKey: "wardId", as: "Wards" });

  // Patient and Doctor Association
  Doctor.hasMany(Patient, { as: "Patients", foreignKey: "wardId" });//doctorid
  Patient.belongsTo(Doctor, { as: "Doctors", foreignKey: "wardId" });

  // Patient and Nurse Association
  Nurse.hasMany(Patient, { as: "Patients", foreignKey: "doctorId" }); //"nurseId"
  Patient.belongsTo(Nurse, { as: "Nurses", foreignKey: "doctorId" });

  // Ward and Patient Association
  Ward.hasMany(Patient, { as: "Patients", foreignKey: "wardId" });
  Patient.belongsTo(Ward, { as: "Wards", foreignKey: "wardId" });

  // Ward and Doctor Association
  Doctor.hasMany(Ward, { as: "Wards", foreignKey: "doctorId" });
  Ward.belongsTo(Doctor, { as: "Doctors", foreignKey: "doctorId" });

  // Ward and Nurse Association
  Ward.hasMany(Nurse, { as: "Nurses", foreignKey: "doctorId" });
  Nurse.belongsTo(Ward, { as: "Wards", foreignKey: "doctorId" });

  // Define the association between DoctorNurse and DoctorWard
  DoctorWard.hasMany(DoctorNurse, {
    foreignKey: "doctorId",
    as: "DoctorNurses",
  });
  DoctorNurse.belongsTo(DoctorWard, {
    foreignKey: "doctorId",
    as: "DoctorWards",
  });

  // Define the association between DoctorNurse and Patient
  Patient.hasMany(DoctorNurse, { as: 'DoctorNurses', foreignKey: 'doctorId' });
  DoctorNurse.belongsTo(Patient, { as: 'Patient', foreignKey: 'doctorId' });

  // Nurse and Ward Association
  // Ward.hasMany(Nurse, { as: "Nurses", foreignKey: "wardId" });
  // Nurse.belongsTo(Ward, { as: "Wards", foreignKey: "wardId" });

  // Doctor and Ward Association
  // Ward.hasMany(Doctor, { as: "Doctors", foreignKey: "wardId" });
  // Doctor.belongsTo(Ward, { as: "Wards", foreignKey: "wardId" });

  // Ward.hasMany(DoctorNurse, { as: "DoctorNurses", foreignKey: "doctorId" });//wardId
  // DoctorNurse.belongsTo(Ward, { as: "Wards", foreignKey: "doctorId" });

  // Nurse.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'Doctors' });
  // Doctor.hasMany(Nurse, { foreignKey: 'doctorId', as: 'Nurses' });
};
