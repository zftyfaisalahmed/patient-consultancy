const doctorController = require('../controller/doctorController')
const route = require('express').Router()
const auth = require('../middleware/auth')

// user register
route.post(`/register`, doctorController.register)

// user login
route.post(`/login`, doctorController.login)

// user logout
route.get(`/logout`, doctorController.logout)

// user auth token
route.get(`/token`, doctorController.doctorToken)

// current login user
route.get(`/current/user`, auth, doctorController.currentDoctor)

// verify user
route.post(`/verify/user`, doctorController.verifyUser)

// generate password
route.post(`/generate/password/link`, doctorController.passwordLink)

// update password
route.patch(`/password/update`, auth, doctorController.updatePassword)

module.exports = route
