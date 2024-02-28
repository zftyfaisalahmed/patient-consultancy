import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import imgSrc from '../../Images/pics';
import './style.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const url = "http://localhost:5001"

const Register = () => {
  const fname = useRef()
  const femail = useRef()
  const fmobile = useRef()
  const fpassword = useRef()

  // to navigate 
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      let data = {
        name : fname.current.value,
        email : femail.current.value,
        mobile : fmobile.current.value,
        password : fpassword.current.value
      }
      console.log('register ',data)
      await 
      axios.post(`${url}/api/auth/register`, data)
      .then((res) => {
        toast.success(res.data.msg)
        navigate('/login')
      });
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }
  return (
    <div className='registerWrapper'>
      
      <div className="row left">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-secondary">Register</h3>
                </div>
                <div className="row mt-3">
           <div className='col-lg-9 col-md-8 offset-md-2 col-sm-12'>
             <div className="card">
              <div className="card-body">
                <form autoComplete='off' onSubmit={submitHandler} >
                <div className="form-group mt-2">
                    <label htmlFor='name'>Name</label>
                       <input type="text" name="name" id="name"  className="form-control" required  ref={fname}/>
                   <div>
                  </div>
                            </div>
                 <div className="form-group mt-2">
                                <label htmlFor='email'>Email</label>
                                <input type="email" name="email" id="email"  className="form-control" required  ref={femail} />
                                <div>
                                   
                                </div>
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor='mobile'>Mobile</label>
                                <input type="number" name="mobile" id="mobile"  className="form-control" required  ref={fmobile}/>
                                <div>
                                   
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor='pass'>Password</label>
                                <input type="password" name="pass" id="pass"
                                    className="form-control" required  ref={fpassword}/>
                                     <div>
                                  
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Register" className='btn btn-outline-success'/>
                                <div className="float-end d-flex align-items-center">
                                    <strong className="text-success">Already registered?</strong>
                                    <Link to ={`/login`} className="btn btn-link">Login</Link>
                                </div>
                            </div>

                </form>
              </div>
             </div>
           </div>
        </div>
        </div>
        
        <div className="registerRight">
        <img src={imgSrc.register} alt='Login' />
      </div>
        
    </div>
  )
}

export default Register
