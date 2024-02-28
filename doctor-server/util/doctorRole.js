const { StatusCodes } = require('http-status-codes')
const userSchema = require('../model/userModel')

const doctorAuth = async (req, res, next) => {
    try {
        let userId = req.token
        let extUser = await userSchema.findById(userId)

        // validate the user
        if(!extUser)
            return res.status(StatusCodes.CONFLICT).json({ msg : `requested user info not exists.`, success : false })

            next()

        return res.json({ msg : 'doctor id is deleted', extUser })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg : err.message , success : false})
    }
}

module.exports = doctorAuth