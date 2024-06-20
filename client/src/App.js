import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import { Button } from 'antd'
import { Login } from './pages/login.js'
import { Register } from './pages/register.js'
import { Home } from './pages/home.js'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
          <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
