import React, { useState, useEffect } from 'react';

const Extras = ({ userInfo }) => {
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
      const response = await fetch(`http://localhost:3000/api/v1/tesis/${tesisId}/extras`, {
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
        Subir Documentos a Extras
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

        {/* Constancia de Amnistía */}
        <div className="flex flex-col">
          <label htmlFor="constanciaAmnistia" className="text-sm font-medium text-gray-600 mb-1">
            Constancia de Amnistía:
          </label>
          <input
            type="file"
            name="constanciaAmnistia"
            id="constanciaAmnistia"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Expedito */}
        <div className="flex flex-col">
          <label htmlFor="expedito" className="text-sm font-medium text-gray-600 mb-1">
            Expedito:
          </label>
          <input
            type="file"
            name="expedito"
            id="expedito"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Certificado de No Adeudo */}
        <div className="flex flex-col">
          <label htmlFor="certificadoDeNoAdeudo" className="text-sm font-medium text-gray-600 mb-1">
            Certificado de No Adeudo:
          </label>
          <input
            type="file"
            name="certificadoDeNoAdeudo"
            id="certificadoDeNoAdeudo"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Constancia de Solvencia */}
        <div className="flex flex-col">
          <label htmlFor="constanciaDeSolvencia" className="text-sm font-medium text-gray-600 mb-1">
            Constancia de Solvencia:
          </label>
          <input
            type="file"
            name="constanciaDeSolvencia"
            id="constanciaDeSolvencia"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Constancia de Matrícula de Egreso */}
        <div className="flex flex-col">
          <label htmlFor="contanciaDeMatriculaEgreso" className="text-sm font-medium text-gray-600 mb-1">
            Constancia de Matrícula de Egreso:
          </label>
          <input
            type="file"
            name="contanciaDeMatriculaEgreso"
            id="contanciaDeMatriculaEgreso"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Carta Compromiso */}
        <div className="flex flex-col">
          <label htmlFor="cartaCompromiso" className="text-sm font-medium text-gray-600 mb-1">
            Carta Compromiso:
          </label>
          <input
            type="file"
            name="cartaCompromiso"
            id="cartaCompromiso"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Carta de Renuncia */}
        <div className="flex flex-col">
          <label htmlFor="cartaRenuncia" className="text-sm font-medium text-gray-600 mb-1">
            Carta de Renuncia:
          </label>
          <input
            type="file"
            name="cartaRenuncia"
            id="cartaRenuncia"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Código Resolución Jurados (Facultad) */}
        <div className="flex flex-col">
          <label htmlFor="codigoResolucionJuradosFacu" className="text-sm font-medium text-gray-600 mb-1">
            Código Resolución Jurados (Facultad):
          </label>
          <input
            type="file"
            name="codigoResolucionJuradosFacu"
            id="codigoResolucionJuradosFacu"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Código Resolución Jurados (Información) */}
        <div className="flex flex-col">
          <label htmlFor="codigoResolucionJuradosInfo" className="text-sm font-medium text-gray-600 mb-1">
            Código Resolución Jurados (Información):
          </label>
          <input
            type="file"
            name="codigoResolucionJuradosInfo"
            id="codigoResolucionJuradosInfo"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Número de Expediente Resolución Jurados */}
        <div className="flex flex-col">
          <label htmlFor="nExpedienteResolucionJuados" className="text-sm font-medium text-gray-600 mb-1">
            Número de Expediente Resolución Jurados:
          </label>
          <input
            type="file"
            name="nExpedienteResolucionJuados"
            id="nExpedienteResolucionJuados"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Código Resolución Asesor (Facultad) */}
        <div className="flex flex-col">
          <label htmlFor="codigoResolucionAsesorFacu" className="text-sm font-medium text-gray-600 mb-1">
            Código Resolución Asesor (Facultad):
          </label>
          <input
            type="file"
            name="codigoResolucionAsesorFacu"
            id="codigoResolucionAsesorFacu"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Código Resolución Asesor (Información) */}
        <div className="flex flex-col">
          <label htmlFor="codigoResolucionAsesorInfo" className="text-sm font-medium text-gray-600 mb-1">
            Código Resolución Asesor (Información):
          </label>
          <input
            type="file"
            name="codigoResolucionAsesorInfo"
            id="codigoResolucionAsesorInfo"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Envío de Resoluciones Asesor */}
        <div className="flex flex-col">
          <label htmlFor="envioDeResolucionesAsesor" className="text-sm font-medium text-gray-600 mb-1">
            Envío de Resoluciones Asesor:
          </label>
          <input
            type="file"
            name="envioDeResolucionesAsesor"
            id="envioDeResolucionesAsesor"
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

export default Extras;
