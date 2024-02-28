import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { screen } from '@testing-library/react';

const url = "http://localhost:5001"


const Display = () => {

    const [docs, setDocs] = useState([])
    console.log(docs)

    const getCallback = useCallback(() => {
    const getInput = async () => {
      await axios
      .get(`${url}/api/patient/open`)
      .then(res => setDocs(res.data.pateients))
      .catch(err => toast.error(err.response.data.msg))
    }
    getInput()
    },[])

    useEffect(() => {
        getCallback()
    },[])

  return (
    <div className='container p-3'>
       <div className="row">
       {
        docs && docs.map((item, index) => {
        return (
          <div className="col-12 col-md-3 ">
            <div class="card mb-3 shadow border-0">
              <div class="card-body">
                <h5 class="card-title">Token {item.token}</h5>
                <hr />
                <p className='card-text'>Name : {item.name}</p>
                <p class="card-text">Email : {item.email ? item.email : "No-Email Entered"}</p>
                <NavLink href="" class="btn btn-info p-1 px-3 rounded-3" to={`/view/details/${item._id}`}>View</NavLink>
              </div>
            </div>
          </div>
            
            )
        })
    }
       </div>
    </div>
  )
}

export default Display