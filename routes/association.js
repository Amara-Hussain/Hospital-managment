const { Doctor } = require("../models/doctor");
const { Nurse } = require("../models/nurse");
const { Ward } = require("../models/ward");
const { Patient } = require("../models/patient");
const DoctorNurse = require("../models/doctornurse");
const DoctorWard = require("../models/doctorward");

module.exports = function () {
  // Doctor and Nurse Association with DoctorNurse junction table
  Doctor.hasMany(DoctorNurse, { foreignKey: "doctorId", as: "DoctorNurses" });
  DoctorNurse.belongsTo(Doctor, { foreignKey: "doctorId", as: "Doctor" });

  Nurse.hasMany(DoctorNurse, { foreignKey: "nurseId", as: "DoctorNurses" });
  DoctorNurse.belongsTo(Nurse, { foreignKey: "nurseId", as: "Nurses" });

  // Doctor and Ward Association with DoctorWard junction table
  Doctor.hasOne(DoctorWard, { foreignKey: "doctorId", as: "DoctorWards" });
  DoctorWard.belongsTo(Doctor, { foreignKey: "doctorId" , as:"Doctor"});

  Ward.hasMany(DoctorWard, { foreignKey: "wardId", as: "DoctorWards" });
  DoctorWard.belongsTo(Ward, { foreignKey: "wardId" , as:"Wards"});

  // Nurse and Ward Association
   //   Ward.hasMany(Nurse, { as: "Nurses", foreignKey: "wardId" });
   //   Nurse.belongsTo(Ward, { as: "Wards", foreignKey: "wardId" });

  // Define the association between DoctorNurse and DoctorWard
   DoctorWard.hasMany(DoctorNurse, { foreignKey: "doctorId", as: "DoctorNurses" });
   DoctorNurse.belongsTo(DoctorWard, { foreignKey: "doctorId", as: "DoctorWards" });

  // Patient and Doctor Association
  Doctor.hasMany(Patient, { as: "Patients", foreignKey: "doctorId" });
  Patient.belongsTo(Doctor, { as: "Doctors", foreignKey: "doctorId" });

  // Patient and Nurse Association
  Nurse.hasMany(Patient, { as: "Patients", foreignKey: "doctorId" });//"nurseId"
  Patient.belongsTo(Nurse, { as: "Nurses", foreignKey: "doctorId" });

  // Ward and Patient Association
  Ward.hasMany(Patient, { as: "Patients", foreignKey: "wardId" });
  Patient.belongsTo(Ward, { as: "Wards", foreignKey: "wardId" });

  // Doctor.hasMany(Ward, { as:"Wards",foreignKey: "doctorId" });
  // Ward.belongsTo(Doctor, { as:"Doctors",foreignKey: "doctorId" });

  // Doctor and Ward Association
  // Ward.hasMany(Doctor, { as: "Doctors", foreignKey: "wardId" });
  // Doctor.belongsTo(Ward, { as: "Wards", foreignKey: "wardId" });
};
