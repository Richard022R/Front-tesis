import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Prevenir navegación con el botón atrás después del logout
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, '', window.location.href);
    };

    // Verificar el estado de la autenticación cuando se carga la página
    const checkAuth = () => {
      const savedUser = localStorage.getItem('userInfo');
      if (!savedUser) {
        logout();
      }
    };

    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.onpopstate = null;
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }

      const userData = data.user;
      const userInfo = {
        id: userData._id,
        nombre: userData.name || '',
        apellidoPaterno: userData.fatherLastName || '',
        apellidoMaterno: userData.motherLastName || '',
        nombreCompleto: `${userData.name || ''} ${userData.fatherLastName || ''} ${userData.motherLastName || ''}`.trim(),
        email: email,
        codigo: userData.code || '',
        numeroDocumento: userData.documentNumber || '',
        typeTesis: userData.typeTesis || '',
        role: userData.role || '',
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUser(userInfo);

      // Redirigir según el rol
      if (userInfo.role === 'admin') {
        navigate('/Secretaria');
      } else {
        navigate('/dashboard');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};