import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import tick from '../images/tick.png'

const url = "http://localhost:5001"

const Message = () => {
    const params = useParams()
    const [userData, setUserData] = useState(null);

    const readFile = useCallback(() => {
        const readData = async () => {
          try {
            const response = await axios.get(`${url}/api/user/single/${params.id}`);
            setUserData(response.data);
            console.log(response.data);
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        }
        readData()
    },[params.id])
  
    useEffect(() => {
      readFile()
    },[readFile])
  
  return (
    <div className='bg'>
      <div className=''>
        <div className='img'>
          <div>
            {
              userData && (
                <div className='text-center text-white div'>
                  <img src={tick} alt="" />
                  <h1>Token Number : {userData.data.token}</h1>
                  <h1>Dr. Appointment Booked <span className='text-danger'>{userData.data.name}</span></h1>
                  <h3>Created Time : {userData.data.createdAt}</h3>
                  {/* <h3>Token gen: {userData.data._id}</h3> */}
                  <h3>Email : {userData.data.email}</h3>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div className='zindex'>
      <div class="animation-container">
        <div class="lightning-container">
          <div class="lightning white"></div>
          <div class="lightning red"></div>
        </div>
        <div class="boom-container">
          <div class="shape circle big white"></div>
          <div class="shape circle white"></div>
          <div class="shape triangle big yellow"></div>
          <div class="shape disc white"></div>
          <div class="shape triangle blue"></div>
        </div>
        <div class="boom-container second">
          <div class="shape circle big white"></div>
          <div class="shape circle white"></div>
          <div class="shape disc white"></div>
          <div class="shape triangle blue"></div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Message