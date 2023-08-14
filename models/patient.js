const mongoose = require("mongoose");
const db = require("../config/MongoDB");

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
    },
    phoneNo: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    gender: {
        type: String
    },
    choiceOfHospitality: {
        type: String
    },
    profilePicture: {
        type: Buffer,  
        // contentType: String 
    }
})

const patientModel = db.model('patients', patientSchema);

module.exports = patientModel;