const express = require('express');
const router = express.Router();
const Patient = require("../models/patient");
const cors = require('cors');

router.use(cors());
router.use(express.json());

router.get("/createPatient", async function (req, res) {
    const body = req.body;
    console.log("body", body);
    return { message: body };
});

module.exports = router;