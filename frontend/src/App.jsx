import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/login'
import Signup from './pages/signup'
import getCurrentUser from './custom_hooks/current_usersahh_pudi'



const App = () => {
  getCurrentUser();
  return (
    <Routes>
      <Route path="/login" element={<Signin />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  )
}

export default App