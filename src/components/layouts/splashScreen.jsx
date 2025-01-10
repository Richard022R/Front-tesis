//splash screen
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SplashScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <img src="/info.png" alt="Academic Logo" className="h-32" />
          </div>
          <div className="flex justify-center">
            <CardTitle className="text-2xl">ACADEMIC</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-sm">
              Bienvenido a Academic, una plataforma para la gestión de tus
              tesis.
            </p>
            <p className="text-center text-sm">
              Inicia sesión para comenzar a utilizar la plataforma.
            </p>
            <div className="text-center">
              <Link to="/login" className="text-teal-600 hover:underline">              
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SplashScreen;