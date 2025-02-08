import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Sidebar from '../shared/Sidebar';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const activeSection = location.pathname.split('/')[2] || 'inicio';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        userInfo={{
          nombre: user?.nombreCompleto || user?.nombre || "Usuario Anónimo",
          codigo: user?.codigo || "Sin código",
          email: user?.email || "Sin email",
          typeTesis: user?.typeTesis || "Desconocido",
          id: user?.id
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