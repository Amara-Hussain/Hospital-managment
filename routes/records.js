const { Sequelize } = require('sequelize');
const sequelize = require("../config/database");
const { Doctor } = require("../models/doctor");
const { Nurse } = require("../models/nurse");
const { Ward } = require("../models/ward");
const { Patient } = require("../models/patient");
const {DoctorNurse} = require("../models/doctornurse");
const {DoctorWard} = require("../models/doctorward");
const { fn, col } = Sequelize;
const express = require("express");
const router = express.Router();

// router.get("/doctor/:id", async (req, res) => {
//   try {
//     // Fetch the doctor record along with associated nurse, ward, and patient records
//     const doctor = await Doctor.findOne({
//       where: { id: req.params.id },
//       include: [
//         {
//           model: DoctorNurse,
//           as: "DoctorNurses",
//           include: [
//             {
//               model: Nurse,
//               as: "Nurses",
//               attributes: ["id", "firstname", "lastname", "cnic", "shift"],
//             },
//           ],
//         },
//         {
//           model: DoctorWard,
//           as: "DoctorWards",
//           include: [
//             {
//               model: Ward,
//               as: "Wards",
//               include: [
//                 {
//                   model: Patient,
//                   as: "Patients",
//                   attributes: ["id", "firstname", "lastname", "cnic"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     if (!doctor) {
//       return res.status(404).send("Doctor not found");
//     }

//     res.send(doctor);
//   } catch (error) {
//     console.error("no response", error);
//     res.status(500).send("Server Error");
//   }
// });

router.get("/doctor/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        [fn("CONCAT", col("Doctor.firstName"), ' ', col("Doctor.lastName")), "fullName"],
        "cnic","shift",
      ],
      include: [
        {
          model: DoctorNurse,
          as: "DoctorNurses",
          attributes: { exclude: ["createdAt", "updatedAt"],},
          include: [
            {
              model: Nurse,
              as: "Nurses",
              attributes: [
                "id",
                [fn("CONCAT", col("DoctorNurses.Nurses.firstname"), ' ', col("DoctorNurses.Nurses.lastname")), "fullname"],
                "cnic","shift",
              ],
            },
          ],
        },
        {
          model: DoctorWard,
          as: "DoctorWards",
          include: [
            {
              model: Ward,
              as: "Wards",
              include: [
                {
                  model: Patient,
                  as: "Patients",
                  attributes: [
                    "id",
                    [fn("CONCAT", col("DoctorWards.Wards.Patients.firstname"), ' ', col("DoctorWards.Wards.Patients.lastname")), "fullname"],
                    "cnic","age",
                  ],
                },
              ],
            },
          ],
        },
      ],
    });


    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    res.send(doctor);
  } catch (error) {
    console.error("no response", error);
    res.status(500).send("Server Error");
  }
});


// router.get("/nurse/:id", async (req, res) => {
//   try {
//     // Fetch the nurse record along with associated doctor, ward, and patient records
//     const nurse = await Nurse.findOne({
//       where: { id: req.params.id },
//       attributes: ["id", "firstname", "lastname", "cnic", "shift"],
//       include: [
//         {
//           model: DoctorNurse,
//           as: "DoctorNurses",
//           include: [
//             {
//               model: Doctor,
//               as: "Doctors",
//               include: [
//                 {
//                   model: DoctorWard,
//                   as: "DoctorWards",
//                   include: [
//                     {
//                       model: Ward,
//                       as: "Wards",
//                       include: [
//                         {
//                           model: Patient,
//                           as: "Patients",
//                           attributes: ["id", "firstname", "lastname", "cnic"],
//                         },
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     if (!nurse) {
//       return res.status(404).send("Nurse not found");
//     }

//     res.send(nurse);
//   } catch (error) {
//     console.error("no response", error);
//     res.status(500).send("Server Error");
//   }
// });


router.get("/nurse/:id", async (req, res) => {
  try {
    // Fetch the nurse record along with associated doctor, ward, and patient records
    const nurse = await Nurse.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        [fn("CONCAT", col("Nurse.firstName"), ' ', col("Nurse.lastName")), "fullName"],
        "cnic","shift",
      ], 
      include: [
        {
          model: DoctorNurse,
          as: "DoctorNurses",
          include: [
            {
              model: Doctor,
              as: "Doctors",
              attributes: [
                "id",
                [fn("CONCAT", col("DoctorNurses.Doctors.firstname"), ' ', col("DoctorNurses.Doctors.lastname")), "fullname"],
                "cnic","shift",
              ],
              include: [
                {
                  model: DoctorWard,
                  as: "DoctorWards",
                  include: [
                    {
                      model: Ward,
                      as: "Wards",
                      include: [
                        {
                          model: Patient,
                          as: "Patients",
                          attributes: [
                            "id",
                            [fn("CONCAT", col("DoctorNurses.Doctors.DoctorWards.Wards.Patients.firstname"), ' ', col("DoctorNurses.Doctors.DoctorWards.Wards.Patients.lastname")), "fullname"],
                            "cnic","age",
                          ],                       
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!nurse) {
      return res.status(404).send("Nurse not found");
    }

    res.send(nurse);
  } catch (error) {
    console.error("no response", error);
    res.status(500).send("Server Error");
  }
});

// router.get("/ward/:id", async (req, res) => {
//   try {
//     // Fetch the ward record along with associated nurse, doctor, and patient records
//     const ward = await Ward.findOne({
//       where: { id: req.params.id },
//       include: [
//         {
//           model: DoctorWard,
//           as: "DoctorWards",
//           include: [
//             {
//               model: Doctor,
//               as: "Doctors",
//               include: [
//                 {
//                   model: DoctorNurse,
//                   as: "DoctorNurses",
//                   include: [
//                     {
//                       model: Nurse,
//                       as: "Nurses",
//                       attributes: [
//                         "id","firstname","lastname","cnic","shift"],
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           model: Patient,
//           as: "Patients",
//           attributes: ["id", "firstname", "lastname", "cnic"],
//         },
//       ],
//     });

//     if (!ward) {
//       return res.status(404).send("Ward not found");
//     }

//     res.send(ward);
//   } catch (error) {
//     console.error("no response", error);
//     res.status(500).send("Server Error");
//   }
// });

router.get("/ward/:id", async (req, res) => {
  try {
    // Fetch the ward record along with associated nurse, doctor, and patient records
    const ward = await Ward.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: DoctorWard,
          as: "DoctorWards",
          attributes: { exclude: ["createdAt", "updatedAt"],},
          include: [
            {
              model: Doctor,
              as: "Doctors",
              attributes: [
                "id",
                [fn("CONCAT", col("DoctorWards.Doctors.firstname"), ' ', col("DoctorWards.Doctors.lastname")), "fullname"],
                "cnic","shift","isActive",
              ],
              include: [
                {
                  model: DoctorNurse,
                  as: "DoctorNurses",
                  include: [
                    {
                      model: Nurse,
                      as: "Nurses",
                      attributes: [
                        "id",
                        [fn("CONCAT", col("DoctorWards.Doctors.DoctorNurses.Nurses.firstname"), ' ', col("DoctorWards.Doctors.DoctorNurses.Nurses.lastname")), "fullname"],
                        "cnic","shift","isActive",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Patient,
          as: "Patients",
          attributes: [
            "id",
            [fn("CONCAT", col("Patients.firstname"), ' ', col("Patients.lastname")), "fullname"],
            "cnic","age",
          ],
        },
      ],
    });

    if (!ward) {
      return res.status(404).send("Ward not found");
    }

    res.send(ward);
  } catch (error) {
    console.error("no response", error);
    res.status(500).send("Server Error");
  }
});



// router.get("/patient/:id", async (req, res) => {
//   try {
//     // Fetch the patient record along with associated ward, doctor, and nurse records
//     const patient = await Patient.findOne({
//       where: { id: req.params.id },
//       include: [
//         {
//           model: Ward,
//           as: "Wards",
//           include: [
//             {
//               model: DoctorWard,
//               as: "DoctorWards",
//               include: [
//                 {
//                   model: DoctorNurse,
//                   as: "DoctorNurses",
//                   include: [
//                     {
//                       model: Nurse,
//                       as: "Nurses",
//                       attributes: [
//                         "id","firstname","lastname","cnic","shift",
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     if (!patient) {
//       return res.status(404).send("Patient not found");
//     }

//     res.send(patient);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Server Error");
//   }
// });

router.get("/patient/:id", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",[fn("CONCAT", col("Patient.firstname"), ' ', col("Patient.lastname")), "fullname"],"cnic","age",
      ],
      include: [
        {
          model: Ward,
          as: "Wards",
          include: [
            {
              model: DoctorWard,
              as: "DoctorWards",
              include: [
                {
                  model: Doctor,
                  as: "Doctors",
                  attributes: [
                    "id",
                    [fn("CONCAT", col("Wards.DoctorWards.Doctors.firstname"), ' ', col("Wards.DoctorWards.Doctors.lastname")), "fullname"],
                    "cnic","shift","isActive",
                  ],
                  include: [
                    {
                      model: DoctorNurse,
                      as: "DoctorNurses",
                      include:[
                        {
                          model: Nurse,
                          as: "Nurses",
                          attributes: [
                            "id",
                            [fn("CONCAT", col("Wards.DoctorWards.Doctors.DoctorNurses.Nurses.firstname"), ' ', col("Wards.DoctorWards.Doctors.DoctorNurses.Nurses.lastname")), "fullname"],
                            "cnic","shift","isActive",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    res.send(patient);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
