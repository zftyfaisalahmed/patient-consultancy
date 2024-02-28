const doctorRoute = require('express').Router()
const { register, login, logout, verifyUser, passwordLink, updatePassword, authToken, currentUser, allFiles } = require("../controller/doctorController")
const auth = require('../util/auth')

doctorRoute.post(`/register`, register)

doctorRoute.post(`/login`, login)

doctorRoute.get(`/logout`, logout)

doctorRoute.get(`/token`, authToken)

doctorRoute.get(`/current/user`, auth, currentUser)

doctorRoute.get('/open', allFiles)

doctorRoute.post(`/verify/user`, verifyUser)

doctorRoute.post(`/generate/password/link`, passwordLink)

doctorRoute.patch(`/password/update`, auth, updatePassword)

module.exports = doctorRoute