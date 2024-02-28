const { StatusCodes } = require("http-status-codes")
const DoctorSchema = require('../model/doctorModel')
const patientSchema = require('../model/userModel')
const bcrypt = require('bcryptjs')
const comparePassword = require('../util/password')
const createAccessToken = require('../util/token')
const mailConfig = require('../util/mail.Config')
// const jwt = require('../util/token')
const passwordReset = require('../template/gen_password')



const register = async (req, res) => {
    try {
        const { name, email, mobile, password, speicalization } = req.body;

        //email
        const extEmail = await DoctorSchema.findOne({email})

        // point duplicates, any server response error 409
        if(extEmail)
            return res.status(StatusCodes.CONFLICT).json({msg: `${email} already exists` ,success : false})
        
        const encPass = await bcrypt.hash(password,10)

        let data = await DoctorSchema.create({
            name,
            email,
            mobile,
            speicalization,
            password: encPass
        })

        res.status(StatusCodes.ACCEPTED).json({msg: "new user registered success", doctor : data, success : true })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : err.message ,success : false})    
    }
}

const login = async (req , res) => {
    try {
        const { email, password } = req.body;

        if( email ){
            let extEmail = await DoctorSchema.findOne({email})

                if(!extEmail)
                return res.status(StatusCodes.CONFLICT).json({msg: `${email} is not registered` ,success : false})

            // compare the password(string, hash)
            let isMatch = await comparePassword(password, extEmail.password)
                if(!isMatch)
                return res.status(StatusCodes.UNAUTHORIZED).json({msg: `password are not matched` ,success : false})

            let authToken = createAccessToken({id : extEmail._id })

            res.cookie('loginToken', authToken, {
                httpOnly: true,
                signed: true,
                path: `/api/doctor/token`,
                maxAge: 1 * 24 * 60 * 60 * 1000
            })

            res.status(StatusCodes.OK).json({msg: `login success(email)`, authToken , success : true})
        }

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : err.message ,success : false})    
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('loginToken', {path: `/api/doctor/token`})

        res.status(StatusCodes.OK).json({msg : `logout successfully`})

        res.json({ msg : `logout` })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : err.message ,success : false})    
    }
}

const currentUser = async (req, res) => {
    try {
        let single = await User.findById({ _id : req.userId }).select('-password')
        if(!single) 
            return res.status(StatusCodes.NOT_FOUND).json({ msg : `patient id not found` ,success : false })
            
        res.status(StatusCodes.ACCEPTED).json({ user : single , success : true})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : err.message ,success : false})    
    }
}

const verifyUser = async (req, res) => {
    try {
        let {email} = req.body

        let extEmail = await DoctorSchema.findOne({ email })
            if(!extEmail)
                return res.status(StatusCodes.CONFLICT).json({ msg : `${email} dosesn't exists`, success : false })

        res.status(StatusCodes.ACCEPTED).json({ msg : `Email id verified Successfully`, success : true })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg : err.message  ,success : false})
    }
}

const passwordLink = async (req, res) => {
    try {
        let {email} = req.body

        let extEmail = await DoctorSchema.findOne({ email })
        if(!extEmail)
            return res.status(StatusCodes.CONFLICT).json({ msg : `${email} dosesn't exists`, success : false })

        // password token 
        let passToken = await createAccessToken({ id : extEmail._id })

        // password template
        let passTemplate = passwordReset(extEmail.name, email, passToken)

        let subject = `Reset your password` 

        let emailRes = await mailConfig(email, subject, passTemplate)

        res.status(StatusCodes.ACCEPTED).json({ msg : `password link successfully sent.`, status : emailRes, success : true, token : passToken })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg : err, success : false })
    }
}

const updatePassword = async (req, res) => {
    try {
        let id = req.userId
        let {password} = req.body

        let extUser = await DoctorSchema.findById({ _id : id })
            if(!extUser)
                return res.status(StatusCodes.CONFLICT).json({ msg : `Requested user info not exists.` ,success : false})

        const encPass = await bcrypt.hash(password,10)

        await DoctorSchema.findByIdAndUpdate({ _id: id }, {password : encPass})

        res.status(StatusCodes.ACCEPTED).json({ msg : `password Updated successfully.` , success : true })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg : err,success : false })
    }
}

const authToken = async (req, res) => {
    try {
        const rToken = req.signedCookies.loginToken

        if(!rToken)
            return res.status(StatusCodes.NOT_FOUND).json({msg : `token not available` ,success : false})

        await jwt.verify(rToken, process.env.ACCESS_SECRET, (err, user) => {
            if(err)
                return res.status(StatusCodes.UNAUTHORIZED).json({msg : `UnAuthorized.. login again` ,success : false})

            res.status(StatusCodes.OK).json({ authToken : rToken , success : true })
            res.json({ msg : `auth token` })
        })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : err.message ,success : false})    
    }
}

const allFiles = async (req, res) => {
    try {
        let patient = await patientSchema.find({ })
        let pateients = patient.filter((item) => item.token !== "")


        // if(token !==  extFile.token)
        //         return res.status(StatusCodes.UNAUTHORIZED).json({ msg : `Unauthorized doctor read...` , success : false})

        res.status(StatusCodes.OK).json({ length : pateients.length, pateients , success : true})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg : err , success : false})
    }
}

module.exports = { register, login, logout, verifyUser, passwordLink, updatePassword, authToken, currentUser, allFiles }