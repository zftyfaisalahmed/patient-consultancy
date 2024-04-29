import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const url = "http://localhost:5001"

function PatientCheck() {
    const {id} = useParams()
    const [patient, setPatient] = useState({})
    const [report, setReport] = useState({})
    const navigate = useNavigate()
    
    useEffect(()=>{
        const singlePatient = async () =>{
        await axios.get(`${url}/api/user/single/${id}`)
            .then((res)=>{
                console.log("data", res.data.data)
                setPatient(res.data.data)
                setReport(res.data)
                console.log(res.data)
            })
            .catch((err)=>{
                toast.error(err)
            })
        }
        singlePatient()

    },[])

    const updateReport = async() => {
        await 
        axios.delete(`${url}/api/user/delete/${report.data._id}`, report)
        console.log("report1", report.data)
        toast.success("Report Checked")
        navigate('/')
    }

    const rejectReport = async ()  => {
        navigate('/')
        toast.success("Report Rejected")
    }

  return (
    <div className='container-fluid individual-patient p-3'>
        <div className="row">
            <div class="page-content page-container" id="page-content">
                <div class="padding">
                    <div class="row container d-flex justify-content-center">
                        <div class="col-xl-6 col-md-12">
                            <div class="card user-card-full">
                                <div class="row m-l-0 m-r-0">
                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                        <div class="card-block text-center text-white">
                                            <div class="m-b-25">
                                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
                                            </div>
                                            <h6 class="f-w-600">Hembo Tingor</h6>
                                            <p>Web Designer</p>
                                            <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Email</p>
                                                    <h6 class="text-muted f-w-400">{patient.email}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Phone</p>
                                                    <h6 class="text-muted f-w-400">{patient.mobile}</h6>
                                                </div>
                                            </div>
                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Problem</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <h6 class="text-muted f-w-400">{patient.problem}</h6>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <Link onClick={updateReport} className='btn-info btn'>Checked</Link> 
                                                <Link onClick={rejectReport} to={'/'} className='btn-danger btn'>Reject</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default PatientCheck