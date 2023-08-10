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
  console.log("findPatient", findPatient);
  if (findPatient !== null) {
  return res.status(500).send({
        message: "Patient already exists",
        body: findPatient
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

router.get("/getPatient/:id", async function (req, res) {
    const body = req.params;
    console.log("body", body);
    const userID = body.id;
    const patient = await Patient.findOne({ userId: userID });
    console.log("patient", patient);
    if(patient == null){
        return res.status(200).send({ message: "Patient Not found"});
    }
    console.log("patient", patient);
    return res.status(200).send({ body: patient});
});

module.exports = router;
