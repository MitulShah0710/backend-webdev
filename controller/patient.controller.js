const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Patient = require("../models/patient");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
router.use(cors());
router.use(express.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Absolute path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/createPatient", async function (req, res) {
  const body = req.body;
  console.log("body", body);
  const userID = body.userId;
  const { firstName, lastName, email, phoneNo, gender, city, address, choiceOfHospitality } = body
  // const findPatient = await Patient.findOne({ userID });
  // console.log("findPatient", findPatient);
  // if (findPatient !== null) {
  // return res.status(500).send({
  //       message: "Patient already exists",
  //       body: findPatient
  //   });
  // }
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

router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.body.userId;
    const file = req.file;

    if (!userId || !file) {
      return res.status(400).json({ error: 'Missing userId or file' });
    }

    const patient = await Patient.findById(userId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Update the profilePicture field for the patient
    patient.profilePicture = file.filename;
    await patient.save();

    return res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
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

router.get("/getPatients", async function (req, res) {
  // const body = req.params;
  // console.log("body", body);
  // const userID = body.id;
  const patient = await Patient.find();
  console.log("patient", patient);
  if(patient == null){
      return res.status(200).send({ message: "Patient Not found"});
  }
  console.log("patient", patient);
  return res.status(200).send({ body: patient});
});

router.delete("/deletePatient/:id", async function (req, res) {
  const params = req.params;
  const userID = params.id;
  const patient = await Patient.findOne({ userId: userID });
  console.log("patient", patient);
  if(patient == null){
      return res.status(200).send({ message: "Patient Not found"});
  }
  const deletePatient  = await Patient.deleteOne({ userId: userID });
  const patients = await Patient.find();
  return res.status(200).send({ message: "Patient Deleted successfully" , body: patients});
});

// router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
//   try {
//     const userId = req.body.userId;

//     // Check if userId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: 'Invalid userId format' });
//     }

//     // Find the user by userId
//     const user = await Patient.findById(userId);
//     console.log("user", user);
//     console.log("file", req.file);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Update the profile picture field in the user document
//     user.profilePicture = req.file.buffer;

//     await user.save();
//     const user1 = await Patient.findById(userId);
//     console.log("user1", user1);
//     res.status(200).json({ message: 'Profile picture uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading profile picture:', error);
//     res.status(500).json({ message: 'An error occurred while uploading the profile picture' });
//   }
// });


module.exports = router;
