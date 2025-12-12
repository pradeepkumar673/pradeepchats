import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signin from './pages/login'
import Signup from './pages/signup'
import useGetCurrentUser from './custom_hooks/current_usersahh_pudi'  
import Home from './pages/Home'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'


const App = () => {
  useGetCurrentUser();
  const { userData } = useSelector((state) => state.user);
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={!userData ? <Signin /> : <Navigate to="/" replace />} 
      />
      
      <Route 
        path="/signup" 
        element={!userData ? <Signup /> : <Navigate to="/" replace />} 
      />
      
      <Route 
        path="/" 
        element={userData ? <Home /> : <Navigate to="/login" replace />} 
      />
      
      <Route 
        path="/profile" 
        element={userData ? <Profile /> : <Navigate to="/signup" replace />} 
      />
    </Routes>
  )
}

export default App