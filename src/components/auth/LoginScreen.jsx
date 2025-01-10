import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      let data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
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
      setLoginError(error.message || 'Error en el inicio de sesión');
      console.error('Error en el inicio de sesión:', error);
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
            <CardTitle className="text-2xl">INICIAR SESIÓN</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Contraseña"
                required
              />
            </div>
            {loginError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <button
              type="submit"
              className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              INGRESAR
            </button>
            <div className="text-sm text-center space-y-2">
              <a href="/forgotPassword" className="text-teal-600 hover:underline">
                ¿Se te olvidó tu contraseña?
              </a>
              <div>
                ¿No tienes una cuenta?{' '}
                <Link 
                  to="/register" 
                  className="text-teal-600 hover:underline"
                >
                  Inscribirse
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;