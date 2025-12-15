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
  
  // ✅ Fix 1: Access the entire state first
  const userState = useSelector((state) => state.user);
  
  // ✅ Fix 2: Safely access userData with null check
  const userData = userState?.userData || null;
  
  // ✅ Debug: Check what's in Redux
  console.log("Redux user state:", userState);
  console.log("User data:", userData);
  
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
        element={userData ? <Profile /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App