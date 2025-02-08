import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  UserCheck, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebars = ({ activeSection, onSectionChange, userInfo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Inicio', section: 'inicio' },
    { icon: FileText, label: 'Documentos', section: 'documentos' },
    { icon: Users, label: 'Gestión de Alumnos', section: 'alumnos' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <img src="/unt.png" alt="UNT Logo" className="h-10" />
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Settings className="h-6 w-6" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg">
              <button 
                className="w-full text-left p-3 hover:bg-gray-700"
                onClick={() => {
                  // Add logout logic here
                  localStorage.removeItem('userInfo');
                }}
              >
                <LogOut className="inline mr-2" /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-8">
        <img 
          src="/user.png" 
          alt="Admin Avatar" 
          className="w-24 h-24 rounded-full mx-auto mb-4" 
        />
        <h2 className="font-bold">{userInfo?.nombre || 'Administrador'}</h2>
        <p className="text-gray-400">Administrador</p>
      </div>

      <nav>
        {menuItems.map((item) => (
          <button 
            key={item.section}
            className={`flex items-center w-full p-3 rounded mb-2 ${
              activeSection === item.section 
                ? 'bg-blue-600' 
                : 'hover:bg-gray-700'
            }`}
            onClick={() => onSectionChange(item.section)}
          >
            <item.icon className="mr-3" /> {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebars;
