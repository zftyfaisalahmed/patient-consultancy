import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthContext } from "./components/Context/AuthContext";
import Pnf from "./components/Default/Pnf";
import ResetPassword from "./components/Auth/ResetPassword";
import {ToastContainer} from 'react-toastify'
import GeneratePassword from "./components/Auth/GeneratePassword";
import Home from "./components/Default/Home";
import PrivateRoute from "./components/PrivateAuth/PrivateRoute";
import Header from './components/Default/Header';
import View from './components/Default/View'
 
const App = () => {
  const context = useContext(AuthContext)
  const isLogin = context.isLogin
  return(
     <BrowserRouter>
     <Header />
        <ToastContainer autoClose={4000} position={'top-right'}/>
        <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home/>}></Route>
        </Route>

        <Route exact path={`/password/reset`} element={isLogin? <Navigate to={`/`}/>: <ResetPassword/>} />
        <Route path='/login' element={isLogin ? <Navigate to={`/`}/> : <Login></Login>}></Route>
        <Route path='/generate/password' element={isLogin ? <Navigate to={`/`}/> : <GeneratePassword></GeneratePassword>}></Route>
        <Route path='/*' element={<Pnf></Pnf>}></Route>
        <Route path={"/view/details/:id"} element={<View />}/>
        </Routes>
     </BrowserRouter>
  )
}

export default App