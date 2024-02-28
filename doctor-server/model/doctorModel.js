const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    mobile:{
        type: String,
        required: true,
        trim: true
    },
    speicalization:{
        type: String,
        required: true,
    },
    role : {
        type: String,
        default: "admin",
        enum: "admin"
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    isBlocked:{
        type : Boolean,
        default: false
    }
},{
    collection: "Doctor",
    timestamps: true
}) 

module.exports = mongoose.model("DoctorInfo", DoctorSchema)