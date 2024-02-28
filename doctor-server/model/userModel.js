const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    token : {
        type: String
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email:{
        type: String,
        trim: true,
        unique: true
    },
    gender:{
        type: String,
        trim: true,
        required: true,
    },
    problem:{
        type: String,
        trim: true,
    }
},{
    collection: "patients",
    timestamps: true
}) 

module.exports = mongoose.model("Patients", PatientSchema)