import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginForm } from './pages/AuthForms/LoginForm';
import { RegisterForm } from './pages/AuthForms/RegisterForm';
import LandingPage from './pages/LandingPage';
//START for admin
import { AdminLoginForm } from './pages/AuthAdminForms/AdminLoginForm';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/authadmin/ProtectedRoute';
//END for admin


function App() {

  return (
   

  

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/admin/login" element={<AdminLoginForm />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  </BrowserRouter>

   
  )
}

export default App
