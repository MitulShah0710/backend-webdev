const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const cors = require("cors");

router.use(cors());
router.use(express.json());

router.post("/createPatient", async function (req, res) {
  const body = req.body;
  console.log("body", body);
  const userID = body.userId;
  const { firstName, lastName, email, phoneNo, gender, city, address, choiceOfHospitality } = body
  const findPatient = await Patient.findOne({ userID });
  if (findPatient !== null) {
  return res.status(500).send({
        message: "Patient already exists"
    });
  }
  console.log("No patient found");
  const addPatient = await Patient.create({
    userId: userID,
    firstName,
    lastName,
    email,
    phoneNo,
    address,
    city,
    gender,
    choiceOfHospitality,
  });
  const patient = await Patient.findOne({userID});
  console.log("patient", patient);
  res.send({
        message: "User added successfully",
        body: addPatient
    });
});

module.exports = router;
