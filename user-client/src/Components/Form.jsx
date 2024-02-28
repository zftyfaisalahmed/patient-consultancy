import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'


const url = "http://localhost:5000"

const Form = () => {

    // const randId = () => {
    //     return Math.floor(Math.random() * 10)
    // };

    const fname = useRef()
    const femail = useRef()
    const fmobile = useRef()
    const fgender = useRef()
    const fproblem = useRef()
    
    const navigate = useNavigate()

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            let data = {
                name : fname.current.value,
                email : femail.current.value,
                mobile : fmobile.current.value,
                gender : fgender.current.value,
                problem : fproblem.current.value
            }
            console.log('problem = ',data)
            await 
            axios
            const response = await axios.post(`${url}/api/user/userForm`, data);
            console.log("res", response)

            toast.success(response.data.msg)

            const newUserId = response.data.data._id;

            navigate(`/message/${newUserId}`)
        } catch (err) {
          console.log(err)
          toast.error(err)
        }
      }
    
    return (
    <div className='left'>
        <div className='container'>
            <div className="row my-3">
                <div className="col-md-12">
                    <h3 className="display-5 text-white">Appointment Booking</h3>
                </div>
                <div className="row">
                    <div className='col-lg-5 col-md-10 col-sm-12'>
                        <div className="">
                            <div className="card-body text-white">
                                <form autoComplete='off' onSubmit={submitHandler}>
                                    <div className="form-group mt-2">
                                        <input type="text" name="name" id="name"  className="form-control" required ref={fname} placeholder='Name'/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="email" name="email" id="email"  className="form-control" ref={femail} placeholder='Email(optional)'/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="number" name="mobile" id="mobile"  className="form-control" required ref={fmobile} placeholder='Moblie Number'/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor='mobile'>Gender<span className='text-danger'>*</span></label>
                                        <select name="gender" id="gender" className='select' style={{"marginLeft" : "10px", "backgroundColor" : "#34346e85"}} ref={fgender}>
                                            <option value="Male" ref={fgender}>Male</option>
                                            <option value="Female" ref={fgender}>Female</option>
                                            <option value="TransGender" ref={fgender}>TransGender</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-2">
                                        <textarea name="" id="" cols="30" rows="5" className='form-control' ref={fproblem} placeholder='Problem'></textarea>
                                    </div>
                                    <div className="form-group mt-2 ">
                                        <input type="submit" className='sub w-100' value='Submit'/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Form