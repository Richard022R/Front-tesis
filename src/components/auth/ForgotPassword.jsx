//recuperar contraseña
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      let data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error en el envío de la solicitud');
      }
  
      data = data["user"];
      const userInfo = {
        id: data._id,
        nombre: data.name || '',
        apellidoPaterno: data.fatherLastName || '',
        apellidoMaterno: data.motherLastName || '',
        nombreCompleto: `${data.name || ''} ${data.fatherLastName || ''} ${data.motherLastName || ''}`.trim(),
        email: email,
        codigo: data.code || '',
        numeroDocumento: data.documentNumber || '',
        typeTesis: data.typeTesis || '',
        role: data.role || '', // Aquí obtenemos el rol
      };
  
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
  
      // Redirigir dependiendo del rol
      if (userInfo.role === 'admin') {
        navigate('/Secretaria'); // Ruta para el panel de administración
      } else {
        navigate('/dashboard'); // Ruta para usuarios regulares
      }
    } catch (error) {
      setForgotPasswordError(error.message || 'Error en el envío de la solicitud');
      console.error('Error en el envío de la solicitud:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <img src="/info.png" alt="Academic Logo" className="h-32" />
          </div>
          <div className="flex justify-center">
            <CardTitle className="text-2xl">RECUPERAR CONTRASEÑA</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Correo Electrónico *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Correo"
                required
              />
            </div>
            {forgotPasswordError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{forgotPasswordError}</AlertDescription>
              </Alert>
            )}
            <button
              type="submit"
              className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              ENVIAR
            </button>
            <div className="text-sm text-center space-y-2">
              <a href="#" className="text-teal-600 hover:underline">
                ¿No recibes el correo?{' '}
                <Link 
                  to="/login" 
                  className="text-teal-600 hover:underline"
                >
                  Iniciar Sesión
                </Link>
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;