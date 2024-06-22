import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import { Button } from 'antd'
import { Login } from './pages/login.js'
import { Register } from './pages/register.js'
import { Home } from './pages/home.js'
import {Toaster} from 'react-hot-toast'
import { ProtectedRoute } from './components/ProtectedRoutes.js';
import { PublicRoutes} from './components/PublicRoutes.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
          <Routes>
          <Route path='/' element={
            <ProtectedRoute>
            <Home />
            </ProtectedRoute>  
          } />
          <Route path='/register' element={
            <PublicRoutes>
            <Register />
            </PublicRoutes>
            } />

          <Route path='/login' element={
            <PublicRoutes>
            <Login />
            </PublicRoutes>} />

          <Route path='/teacher-registration' element={
            <PublicRoutes>
            <Register />
            </PublicRoutes>
            } />

          <Route path='/teacher-login' element={
            <PublicRoutes>
            <Login />
            </PublicRoutes>} 
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
