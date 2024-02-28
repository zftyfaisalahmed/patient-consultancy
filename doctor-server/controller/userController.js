const { StatusCodes } = require("http-status-codes")
const PatientSchema = require('../model/userModel')

// read single - get ref
const readSingleFile = async (req, res) => {
    try {
        let id = req.params.id
        
        let singlePatient = await PatientSchema.findById({ _id: id})
 
 
        res.status(StatusCodes.ACCEPTED).json({ data: singlePatient})
     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message}) 
     }
}

const userForm = async(req, res) => {
    try {
        let { name, mobile, email, gender, problem } = req.body;
          let mainPatient = await PatientSchema.find({})
         let tokengen = mainPatient.length + 1;
        
        let newPatient = await PatientSchema.create({
            name,
            email,
            mobile,
            gender,
            problem,
            token : tokengen
        })
        
        res.status(StatusCodes.OK).json({msg : `New Patient Created Successfully`, data: newPatient})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message})  
    }
}


const deleteUser = async(req, res) => {
    try{
        let id = req.params.id
        let single = await PatientSchema.findById(id)

        if(!single)
            return res.status(StatusCodes.CONFLICT).json({ msg : `requested Patient id is not  found`, success : false })
    
        await PatientSchema.findByIdAndDelete({ _id : id })
    
        res.status(StatusCodes.OK).json({ msg : 'Patient deleted successfully', success : true, deleteduser:single })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message, success : false})
    }
}

module.exports = {readSingleFile, userForm, deleteUser}