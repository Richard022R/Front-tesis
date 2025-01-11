import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import ForgotPassword from './components/auth/ForgotPassword';  
import SplashScreen from './components/layouts/splashScreen';
import Dashboard from './components/layouts/Dashboard';
import Inicio from './components/Student/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />  
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* Rutas del Dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="inicio" element={<Inicio />} />
          <Route path="tesis" element={<div>Proceso de Tesis</div>} />
          <Route path="ajustes" element={<div>Hola ajustes</div>} />
          <Route path="anexo11" element={<div>Hola anexo11</div>} />
          <Route path="anexo30" element={<div>Hola anexo30</div>} />
          <Route path="extras" element={<div>Hola extras</div>} />
          <Route index element={<Navigate to="inicio" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;