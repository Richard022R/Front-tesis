import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../shared/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [userInfo, setUserInfo] = useState(() => {
    const infoGuardada = localStorage.getItem('userInfo');
    return infoGuardada ? JSON.parse(infoGuardada) : null;
  });

  // Protección de ruta
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // Obtener la sección activa de la URL
  const activeSection = location.pathname.split('/')[2] || 'inicio';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        userInfo={{
          nombre: userInfo?.nombreCompleto || userInfo?.nombre || "Usuario Anónimo",
          codigo: userInfo?.codigo || "Sin código",
          email: userInfo?.email || "Sin email",
          typeTesis: userInfo?.typeTesis || "Desconocido",
          id: userInfo?.id
        }}
        activeSection={activeSection}
      />
      <div className="flex-1 ml-64 p-6 overflow-auto">
        {/* Aquí se renderizarán las rutas anidadas */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;