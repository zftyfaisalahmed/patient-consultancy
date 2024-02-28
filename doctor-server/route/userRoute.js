const fileRoute = require("express").Router()
const { readSingleFile, userForm, deleteUser } = require("../controller/userController")
const doctorRole = require('../util/doctorRole')
const auth = require('../util/auth')

fileRoute.get(`/single/:id`, readSingleFile)

fileRoute.post('/userForm', userForm)

fileRoute.delete("/delete/:id", deleteUser);

module.exports = fileRoute