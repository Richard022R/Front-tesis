import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import ForgotPassword from './components/auth/ForgotPassword';  
import SplashScreen from './components/layouts/splashScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" />} />
        <Route path="/splash" element={<SplashScreen/>} />
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />  
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;