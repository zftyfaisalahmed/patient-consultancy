import React from 'react'
import Display from './Display';
import { Link } from 'react-router-dom';

const url = " http://localhost:5001"

const Home = () => {
  
  const url1 = 'http://localhost:3001'

  return (
    <div className='main-content'>
      <div className="section home-banner row-middle">
        <div className="inner-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-9">
              <div className="banner-content">
                <h1 className='hello'>
                  Clean Medical Template
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum numquam vitae totam quam optio nisi nam maiores inventore sequi beatae. Tempore dolorum ipsa cumque eligendi doloribus voluptas, cupiditate repellendus porro.
                </p>
                <Link title='Consult' className='btn btn-primary consult-btn'  onClick={url1}>Consult</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Display />
    </div>
  )
}

export default Home