import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Ajuste = ({ userInfo, setUserInfo }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombreCompleto: '',
    codigo: '',
    email: '',
    numeroDocumento: '',
    typeTesis: ''
  });

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        nombre: userInfo.nombre || '',
        apellidoPaterno: userInfo.apellidoPaterno || '',
        apellidoMaterno: userInfo.apellidoMaterno || '',
        nombreCompleto: userInfo.nombreCompleto || '',
        codigo: userInfo.codigo || '',
        email: userInfo.email || '',
        numeroDocumento: userInfo.numeroDocumento || '',
        typeTesis: userInfo.typeTesis || ''
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setIsModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserInfo = {
      id: userInfo.id,
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      nombreCompleto: `${formData.nombre} ${formData.apellidoPaterno} ${formData.apellidoMaterno}`.trim(),
      email: formData.email,
      codigo: formData.codigo,
      numeroDocumento: formData.numeroDocumento,
      typeTesis: formData.typeTesis
    };

    setUserInfo(updatedUserInfo);
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    setIsModified(false);
    
    // Usando un toast de Tailwind para notificación más moderna
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 ease-in-out';
    toast.textContent = 'Datos actualizados correctamente';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Ajustes de Perfil
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              required
              placeholder="Juan"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700">
              Apellido Paterno
            </label>
            <input
              type="text"
              id="apellidoPaterno"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              placeholder="Pérez"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700">
              Apellido Materno
            </label>
            <input
              type="text"
              id="apellidoMaterno"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              placeholder="García"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            required
            placeholder="usuario@ejemplo.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
              Código
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              placeholder="20231234"
            />
          </div>
          <div>
            <label htmlFor="numeroDocumento" className="block text-sm font-medium text-gray-700">
              Número de Documento
            </label>
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              placeholder="DNI/Pasaporte"
            />
          </div>
        </div>

        <div>
          <label htmlFor="typeTesis" className="block text-sm font-medium text-gray-700">
            Tipo de Tesis
          </label>
          <select
            id="typeTesis"
            name="typeTesis"
            value={formData.typeTesis}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          >
            <option value="">Selecciona un tipo de tesis</option>
            <option value="Tesis">Tesis</option>
            <option value="Suficiencia">Suficiencia</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={!isModified}
            className={`w-full py-3 rounded-md text-white font-semibold transition-all duration-200 ${
              isModified 
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Actualizar Datos
          </button>
        </div>
      </form>
    </div>
  );
};

export default Ajuste;