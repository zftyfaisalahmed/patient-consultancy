// doctor schema
const mongoose = require('mongoose')

const doctorSchma = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique : [true, "Email already exists"]
    },
    mobile : {
        type: String,
        required: true,
        trim: true,
        unique : [true, "Mobile number already exists"]
    },
    password : {
        type: String,
        required: true,
        trim: true
    },
    isActive : {
        type: Boolean,
        default: true,
    },
    role : {
        type: String,
        default: "Doctor",
    },
    isBlocked : {
        type : Boolean,
        default: false
    }
},{
    collection: "Doctor-Register",
    timestamps: true
})

module.exports = mongoose.model("Doctor", doctorSchma)