import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import Form from './Components/Form';
import Message from './Components/Message';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={4000} position={'top-right'}/>
      <Routes>
        <Route path='/' element={<Form />}></Route>
        <Route path={`/message/:id`} element={<Message />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
