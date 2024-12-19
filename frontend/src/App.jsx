import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/AuthForms/LoginForm';
import { RegisterForm } from './components/AuthForms/RegisterForm';
import LandingPage from './components/LandingPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

  

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
