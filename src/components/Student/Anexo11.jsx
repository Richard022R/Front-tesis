import React, { useState, useEffect } from "react";

const Anexo11 = () => {
  const [informeComiteEtica, setInformeComiteEtica] = useState(null);
  const [dictamenAprobacionProyecto, setDictamenAprobacionProyecto] = useState(null);
  const [tesisId, setTesisId] = useState("");
  const [documentos, setDocumentos] = useState({});
  const [message, setMessage] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Obtener la tesis del usuario
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
        console.error("Error al obtener la tesis:", error);
      }
    };

    fetchTesis();
  }, [userInfo.userId]);

  // Obtener los documentos del Anexo 11
  useEffect(() => {
    const fetchAnexo11Documents = async () => {
      if (!tesisId) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/api/v1/tesis/anexo11/${tesisId}`,
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
        console.error("Error al obtener los documentos del Anexo 11:", error);
      }
    };

    fetchAnexo11Documents();
  }, [tesisId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userInfo.userId);

    if (informeComiteEtica) {
      formData.append("informeComiteEtica", informeComiteEtica);
    }
    if (dictamenAprobacionProyecto) {
      formData.append("dictamenAprobacionProyecto", dictamenAprobacionProyecto);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:3000/api/v1/tesis", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ type: 'success', text: 'Documentos subidos exitosamente.' });
        console.log('Respuesta del servidor:', result);

        // Actualizar la lista de documentos después de subir
        const fetchResponse = await fetch(
          `http://localhost:3000/api/v1/tesis/anexo11/${tesisId}`,
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
        setMessage({ type: 'error', text: errorResult.message || 'Error al subir los documentos.' });
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
        Subir Documentos al Anexo 11
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

      {userInfo.status === 0 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="informeComiteEtica"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Informe Comité de Ética:
            </label>
            <input
              type="file"
              id="informeComiteEtica"
              onChange={(e) => setInformeComiteEtica(e.target.files[0])}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          <div>
            <label
              htmlFor="dictamenAprobacionProyecto"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Dictamen de Aprobación del Proyecto:
            </label>
            <input
              type="file"
              id="dictamenAprobacionProyecto"
              onChange={(e) => setDictamenAprobacionProyecto(e.target.files[0])}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subir Archivos
          </button>
        </form>
      )}

      {/* Sección de archivos subidos */}
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

export default Anexo11;