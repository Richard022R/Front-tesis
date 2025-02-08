import React, { useState, useEffect } from 'react';

const Anexo30 = ({ userInfo }) => {
  const [message, setMessage] = useState(null);
  const [tesisId, setTesisId] = useState('');

  useEffect(() => {
    const fetchTesis = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/tesis/user/${userInfo.id}`);
        const data = await response.json();
        if (response.ok) {
          setTesisId(data.data._id);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error al obtener la tesis:', error);
      }
    };

    fetchTesis();
  }, [userInfo.id]); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set('id', tesisId);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/tesis/${tesisId}/anexo30`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ type: 'success', text: 'Tesis creada exitosamente.' });
        console.log('Respuesta del servidor:', result);
      } else {
        const errorResult = await response.json();
        setMessage({ type: 'error', text: errorResult.message || 'Error al crear la tesis.' });
        console.error('Error en la respuesta:', errorResult);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión con el servidor.' });
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Subir Documentos al Anexo 30
      </h1>

      {message && (
        <div
          className={`p-4 mb-4 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID de la Tesis */}
        <div className="flex flex-col">
          <label htmlFor="id" className="text-sm font-medium text-gray-600 mb-1">
            ID de la Tesis:
          </label>
          <input
            type="text"
            name="id"
            id="id"
            value={tesisId}
            readOnly
            className="p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Constancia de Originalidad */}
        <div className="flex flex-col">
          <label htmlFor="constanciaOriginalidad" className="text-sm font-medium text-gray-600 mb-1">
            Constancia de Originalidad:
          </label>
          <input
            type="file"
            name="constanciaOriginalidad"
            id="constanciaOriginalidad"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Código Acta de Sustentación */}
        <div className="flex flex-col">
          <label htmlFor="codigoActaSustentacion" className="text-sm font-medium text-gray-600 mb-1">
            Código Acta de Sustentación:
          </label>
          <input
            type="file"
            name="codigoActaSustentacion"
            id="codigoActaSustentacion"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Código Reporte de Similitud (Carta) */}
        <div className="flex flex-col">
          <label htmlFor="codigoReporteSimilitudCarta" className="text-sm font-medium text-gray-600 mb-1">
            Código Reporte de Similitud (Carta):
          </label>
          <input
            type="file"
            name="codigoReporteSimilitudCarta"
            id="codigoReporteSimilitudCarta"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Recibo Turnitin */}
        <div className="flex flex-col">
          <label htmlFor="reciboTurnitin" className="text-sm font-medium text-gray-600 mb-1">
            Recibo Turnitin:
          </label>
          <input
            type="file"
            name="reciboTurnitin"
            id="reciboTurnitin"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Reporte de Similitud */}
        <div className="flex flex-col">
          <label htmlFor="reporteSimilitud" className="text-sm font-medium text-gray-600 mb-1">
            Reporte de Similitud:
          </label>
          <input
            type="file"
            name="reporteSimilitud"
            id="reporteSimilitud"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Subir Documentos
        </button>
      </form>
    </div>
  );
};

export default Anexo30;
