// decrypt the user id from auth token received by headers auth

const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        let token = req.header('Authorization')
        if(!token)
            return res.status(StatusCodes.NOT_FOUND).json({ msg : `token not found`, success : false })

            await jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
                if(err)
                return res.status(StatusCodes.UNAUTHORIZED).json({ msg : `UnAuthorized token, login again`, success : false })

                req.userId = data.id

                next()
            })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg : err, success : false })
    }
}

module.exports = auth