import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    // Temporizador para redirigir automáticamente al inicio de sesión
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => navigate('/login'), 1000); // Espera a que termine la animación
    }, 4000); // Dura 4 segundos antes de redirigir

    return () => clearTimeout(timer); // Limpia el temporizador
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 overflow-hidden">
      {/* Fondo con partículas */}
      <div className="absolute inset-0 -z-10 animate-fadeInSlow">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animation: `float ${
                3 + Math.random() * 3
              }s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div
        className={`w-full max-w-md transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex justify-center">
            <img
              src="/info.png"
              alt="Academic Logo"
              className="h-32 animate-fadeIn hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              ACADEMIC
            </h1>
            <p className="text-gray-600">
              Bienvenido a Academic, la plataforma de La escueala de Informatica para la gestión de tus tesis.
            </p>
            <p className="text-gray-500">Inicia sesión para comenzar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
