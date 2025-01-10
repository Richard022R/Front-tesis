import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    fatherLastName: '',
    motherLastName: '',
    birthdate: '',
    genre: '',
    email: '',
    password: '',
    code: '',
    documentNumber: '',
    typeTesis: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      alert('Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
      setRegisterError('Error en el registro');
      console.error('Registration error:', error);
    }
  };

  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <img src="/info.png" alt="Academic Logo" className="h-32" />
          </div>
          <div className="flex justify-center">
            <CardTitle className="text-2xl">REGISTRARSE</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Apellido Paterno *</label>
                <input
                  name="fatherLastName"
                  value={formData.fatherLastName}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Apellido Materno *</label>
                <input
                  name="motherLastName"
                  value={formData.motherLastName}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha de Nacimiento *</label>
                <input
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Género *</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Código *</label>
                <input
                  name="code"
                  value={formData.code}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Correo Electrónico *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Contraseña *</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Número de Documento *</label>
                <input
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Modalidad de Tesis*</label>
                <select
                  name="typeTesis"
                  value={formData.typeTesis}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Tesis">Tesis (curricula)</option>
                  <option value="Suficiencia">Suficiencia y/o Experiencia Profesional</option>
                </select>
              </div>
            </div>

            {registerError && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{registerError}</AlertDescription>
              </Alert>
            )}

            <button
              type="submit"
              className="w-full mt-4 p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              REGISTRARSE
            </button>

            <div className="text-sm text-center mt-4">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                to="/login" 
                className="text-teal-600 hover:underline"
              >
                Iniciar Sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterScreen;