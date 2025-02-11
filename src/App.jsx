import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import AuthGuard from './components/auth/AuthGuard';
import PublicRoute from './components/auth/PublicRoute';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import ForgotPassword from './components/auth/ForgotPassword';  
import SplashScreen from './components/layouts/splashScreen';
import Dashboard from './components/layouts/Dashboard';
import Inicio from './components/Student/Inicio';
import Ajustes from './components/layouts/Ajuste';
import Anexo11 from './components/Student/Anexo11';
import Anexo30 from './components/Student/Anexo30';
import Extras from './components/Student/Extras';

function App() {
  
  

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={
            <PublicRoute>
              <Navigate to="/splash" />
            </PublicRoute>
          } />
          <Route path="/splash" element={
            <PublicRoute>
              <SplashScreen />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <RegisterScreen />
            </PublicRoute>
          } />
          <Route path="/forgotPassword" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />

          {/* Rutas protegidas */}
          <Route path="/dashboard/*" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }>
            <Route path="inicio" element={<Inicio />} />
            <Route path="tesis" element={<div>Proceso de Tesis</div>} />
            <Route path="ajustes" element={<Ajustes />} />
            <Route path="anexo11" element={<Anexo11 />} />
            <Route path="anexo30" element={<Anexo30 />} />
            <Route path="extras" element={<Extras />} />
            <Route index element={<Navigate to="inicio" replace />} />
          </Route>

          {/* Ruta para manejar URLs no encontradas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;