import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const url = "http://localhost:5001"

const RELOAD_PAGE_CONDITION = false;

const Header = () => {

    const { isAdmin, isUser, isLogin, currentUser, token, setToken, setIsAdmin, setIsUser, setIsLogin, setCurrentUser } = useContext(AuthContext)

    const [pageReloaded, setPageReloaded] = useState(false);

    // const navigate = useNavigate()
    const reloadPageOnce = () => {
      if (pageReloaded && RELOAD_PAGE_CONDITION) {
        // Reload the page if the condition is true and it hasn't been reloaded yet
        window.location.reload();
        setPageReloaded(true);
      }
    };
  
    useEffect(() => {
      reloadPageOnce();
    }, []);
    // useEffect(() => {
    //   if (!pageReloaded) {
    //     // Reload the page if the condition is true
    //     setPageReloaded(true);

    //     // window.location.reload();
    //   }
    // }, []);

    const logoutHandler = async () =>{
        if(window.confirm(`Are you sure to logout`)){
        await axios
        .get(`${url}/api/patient/logout`)
        .then(res => {
            toast.success(res.data.msg)
            localStorage.clear()

            setToken(false)
            setIsLogin(false)
            setIsUser(false)
            setIsAdmin(false)
            setCurrentUser(false)
        })
        .catch(err => toast.error(err.response.data.msg))
        } else{
        return
        }
    }
  return (
    <header>
      <nav className={isLogin ? "navbar navbar-expand-md navbar-dark bg-primary" : "navbar navbar-expand-md navbar-dark bg-primary bg-opacity-75"}>
        <div className="container">
            <NavLink to={'/'} className='navbar-brand'>DOCTOR CONSULTANCY</NavLink>
            <button type='button' className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#menu'>
                <span className="navbar-toggler-icon"></span>
            </button>
           { isLogin ? 
           (<div className="collapse navbar-collapse" id="menu">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={'/'}  className="nav-link">Home</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item dropdown">
                    {
                      currentUser ? (
                        <NavLink to='/' className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                          <b className='text-uppercase'>{ currentUser ? currentUser.name : null}</b><i className="bi bi-person"></i>
                        </NavLink>
                      ) : (
                        // <NavLink to='/' className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        //   <b className='text-uppercase'>{ currentUser ? currentUser.name : null}</b><i className="bi bi-person"></i>
                        // </NavLink>
                        <NavLink to={'/login'} onClick={logoutHandler} className="nav-link">
                          Logout
                        </NavLink>
                      )
                    }
                    {
                      isAdmin ? (
                        <ul className="dropdown-menu">
                          <li className=''>
                            <NavLink className='dropdown-item'>Admin Dashboard</NavLink>
                          </li>
                          <li className=''>
                            <NavLink to={'/login'} className='dropdown-item' onClick={logoutHandler}>
                              Logout
                            </NavLink>
                          </li>
                        </ul>) : null
                    }
                  </li>
                </ul>
            </div>) : (
            <div className="collapse navbar-collapse " id="menu">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to={'/login'}  className="nav-link">Login</NavLink>
                    </li>
                </ul>
            </div>
            )
            }
        </div>
    </nav>
    </header>


  )
}

export default Header
