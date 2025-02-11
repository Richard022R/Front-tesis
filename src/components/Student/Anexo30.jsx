import React, { useState, useEffect } from 'react';

const Anexo30 = () => {
  const [message, setMessage] = useState(null);
  const [tesisId, setTesisId] = useState('');
  const [constanciaOriginalidad, setConstanciaOriginalidad] = useState(null);
  const [codigoActaSustentacion, setCodigoActaSustentacion] = useState(null);
  const [codigoReporteSimilitudCarta, setCodigoReporteSimilitudCarta] = useState(null);
  const [reciboTurnitin, setReciboTurnitin] = useState(null);
  const [reporteSimilitud, setReporteSimilitud] = useState(null);
  const [documentos, setDocumentos] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchTesis = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/api/v1/tesis/user/${userInfo.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  }, [userInfo.userId]);

  useEffect(() => {
    const fetchAnexo30Documents = async () => {
      if (!tesisId) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/api/v1/tesis/anexo30/${tesisId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setDocumentos(data.data || {});
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error al obtener los documentos del Anexo 30:', error);
      }
    };

    fetchAnexo30Documents();
  }, [tesisId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("userId", userInfo.userId);

    if (constanciaOriginalidad) {
      formData.append("constanciaOriginalidad", constanciaOriginalidad);
    }
    if (codigoActaSustentacion) {
      formData.append("codigoActaSustentacion", codigoActaSustentacion);
    }
    if (codigoReporteSimilitudCarta) {
      formData.append("codigoReporteSimilitudCarta", codigoReporteSimilitudCarta);
    }
    if (reciboTurnitin) {
      formData.append("reciboTurnitin", reciboTurnitin);
    }
    if (reporteSimilitud) {
      formData.append("reporteSimilitud", reporteSimilitud);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/tesis/${tesisId}/anexo30`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ type: 'success', text: 'Documentos subidos exitosamente.' });
        console.log('Respuesta del servidor:', result);

        const fetchResponse = await fetch(
          `http://localhost:3000/api/v1/tesis/anexo30/${tesisId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchData = await fetchResponse.json();
        if (fetchResponse.ok) {
          setDocumentos(fetchData.data || {});
        }
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
            onChange={(e) => setConstanciaOriginalidad(e.target.files[0])}
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
            onChange={(e) => setCodigoActaSustentacion(e.target.files[0])}
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
            onChange={(e) => setCodigoReporteSimilitudCarta(e.target.files[0])}
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
            onChange={(e) => setReciboTurnitin(e.target.files[0])}
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
            onChange={(e) => setReporteSimilitud(e.target.files[0])}
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

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Documentos Subidos</h2>
        {Object.keys(documentos).length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Nombre del Documento</th>
                <th className="px-4 py-2 border">Fecha de Subida</th>
                <th className="px-4 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(documentos).map(([key, doc]) => (
                <tr key={key}>
                  <td className="px-4 py-2 border">{doc.fileName}</td>
                  <td className="px-4 py-2 border">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <a
                      href={`http://localhost:3000/api/v1/tesis/download/${tesisId}/${key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Descargar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No hay documentos subidos aún.</p>
        )}
      </section>
    </div>
  );
};

export default Anexo30;