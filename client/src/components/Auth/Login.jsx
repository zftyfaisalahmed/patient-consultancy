import React, { useContext, useRef, useState } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import imgSrc from '../../Images/pics'
import './style.css'
import { AuthContext } from '../Context/AuthContext'
import { toast } from 'react-toastify';
import axios from 'axios'

const url = "http://localhost:4500"

const Login = () => {
  const context = useContext(AuthContext)
  const setIsLogin = context.setIsLogin
  const setToken = context.setToken

  const [view, setView] = useState('email');

  const femail = useRef()
  const fmobile = useRef()
  const fpassword = useRef()

  const viewHandler = (val) => {
    setView(val)
  }

  //navigate instance
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
        if(view === 'email'){
            let data = {
                email : femail.current.value,
                password : fpassword.current.value
            }
            console.log(`email login =`, data)
            authenticateUser(data)
          
        }
    } catch (err) {
        toast.error(err)
    }
  }

  const authenticateUser = async (user) => {
    await 
    axios
    .post(`${url}/api/auth/login`, user)
    .then(res => {
      toast.success(res.data.msg)
      setIsLogin(res.data.success)
      setToken(res.data.token)
      console.log(" = ", res.data.success)
      localStorage.setItem('CC_TOKEN', res.data.authToken)
      localStorage.setItem('CC_STATUS', res.data.success)
      // window.location.href = '/'
      navigate('/')
    })
  .catch(err => toast.error(err.response.data.msg))
  }
  return (
    <div className='loginWrapper'>
      <div className="left">
        <img src={imgSrc.login} alt='Login' />
      </div>
       <div className="row right">
        <div className="col-md-12 text-center">
            <h3 className="display-3 text-secondary">Login</h3>
        </div>
         <div className="row mt-3">
            <div className='col-lg-8 col-md-8 offset-md-2 col-sm-12'>
               <div className="card">
               <div className="btn-group d-flex justify-content-center">
                <button className="btn btn-info" onClick={() => viewHandler('email')}>Email</button>
              </div>
                <div className="card-body">
                <form autoComplete='off' onSubmit={submitHandler}>
                <div className="form-group mt-2">
                    <label htmlFor='email'>Email</label>
                      <input type="email" name="email" id="email"  ref={femail}  className="form-control" required/><div>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor='password'>Password</label>
                                <input type="password" name="password" id="password" ref={fpassword} className="form-control" required/>
                                <div>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Login" className='btn btn-outline-success'/>
                                <div className="float-end d-flex align-items-center">
                                    <strong className="text-success">Are You a New User?</strong>
                                    <Link to ={`/register`} className="btn btn-link">Register</Link>   
                                </div>
                               
                            </div>
                            <div className='float-end d-flex align-items-center'>
                                <NavLink className="text-link" to={'/generate/password'}>Forgot Password</NavLink>
                                </div>
                            </form>
                </div>
               </div>
            </div>
         </div>
       </div>
    </div>
  )
}

export default Login
