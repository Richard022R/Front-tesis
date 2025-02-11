import React, { useState, useEffect } from 'react';

const Extras = () => {
  const [message, setMessage] = useState(null);
  const [tesisId, setTesisId] = useState('');
  const [documentos, setDocumentos] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Estados para los archivos
  const [constanciaAmnistia, setConstanciaAmnistia] = useState(null);
  const [expedito, setExpedito] = useState(null);
  const [certificadoDeNoAdeudo, setCertificadoDeNoAdeudo] = useState(null);
  const [constanciaDeSolvencia, setConstanciaDeSolvencia] = useState(null);
  const [contanciaDeMatriculaEgreso, setContanciaDeMatriculaEgreso] = useState(null);
  const [cartaCompromiso, setCartaCompromiso] = useState(null);
  const [cartaRenuncia, setCartaRenuncia] = useState(null);
  const [codigoResolucionJuradosFacu, setCodigoResolucionJuradosFacu] = useState(null);
  const [codigoResolucionJuradosInfo, setCodigoResolucionJuradosInfo] = useState(null);
  const [nExpedienteResolucionJuados, setNExpedienteResolucionJuados] = useState(null);
  const [codigoResolucionAsesorFacu, setCodigoResolucionAsesorFacu] = useState(null);
  const [codigoResolucionAsesorInfo, setCodigoResolucionAsesorInfo] = useState(null);
  const [envioDeResolucionesAsesor, setEnvioDeResolucionesAsesor] = useState(null);

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
        console.error('Error al obtener la tesis:', error);
      }
    };

    fetchTesis();
  }, [userInfo.userId]);

  // Obtener los documentos de Extras
  useEffect(() => {
    const fetchExtrasDocuments = async () => {
      if (!tesisId) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/api/v1/tesis/extras/${tesisId}`,
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
        console.error('Error al obtener los documentos de Extras:', error);
      }
    };

    fetchExtrasDocuments();
  }, [tesisId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userId", userInfo.userId);

    if (constanciaAmnistia) formData.append("constanciaAmnistia", constanciaAmnistia);
    if (expedito) formData.append("expedito", expedito);
    if (certificadoDeNoAdeudo) formData.append("certificadoDeNoAdeudo", certificadoDeNoAdeudo);
    if (constanciaDeSolvencia) formData.append("constanciaDeSolvencia", constanciaDeSolvencia);
    if (contanciaDeMatriculaEgreso) formData.append("contanciaDeMatriculaEgreso", contanciaDeMatriculaEgreso);
    if (cartaCompromiso) formData.append("cartaCompromiso", cartaCompromiso);
    if (cartaRenuncia) formData.append("cartaRenuncia", cartaRenuncia);
    if (codigoResolucionJuradosFacu) formData.append("codigoResolucionJuradosFacu", codigoResolucionJuradosFacu);
    if (codigoResolucionJuradosInfo) formData.append("codigoResolucionJuradosInfo", codigoResolucionJuradosInfo);
    if (nExpedienteResolucionJuados) formData.append("nExpedienteResolucionJuados", nExpedienteResolucionJuados);
    if (codigoResolucionAsesorFacu) formData.append("codigoResolucionAsesorFacu", codigoResolucionAsesorFacu);
    if (codigoResolucionAsesorInfo) formData.append("codigoResolucionAsesorInfo", codigoResolucionAsesorInfo);
    if (envioDeResolucionesAsesor) formData.append("envioDeResolucionesAsesor", envioDeResolucionesAsesor);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/tesis/${tesisId}/extras`, {
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

        // Actualizar la lista de documentos después de subir
        const fetchResponse = await fetch(
          `http://localhost:3000/api/v1/tesis/extras/${tesisId}`,
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

        {/* Campos de archivos */}
        <div className="flex flex-col">
          <label htmlFor="constanciaAmnistia" className="text-sm font-medium text-gray-600 mb-1">
            Constancia de Amnistía:
          </label>
          <input
            type="file"
            id="constanciaAmnistia"
            onChange={(e) => setConstanciaAmnistia(e.target.files[0])}
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
            id="expedito"
            onChange={(e) => setExpedito(e.target.files[0])}
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
            id="certificadoDeNoAdeudo"
            onChange={(e) => setCertificadoDeNoAdeudo(e.target.files[0])}
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
            id="constanciaDeSolvencia"
            onChange={(e) => setConstanciaDeSolvencia(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contancia de Matricula de Egreso */}
        <div className="flex flex-col">
          <label htmlFor="contanciaDeMatriculaEgreso" className="text-sm font-medium text-gray-600 mb-1">
            Contancia de Matricula de Egreso:
          </label>
          <input
            type="file"
            id="contanciaDeMatriculaEgreso"
            onChange={(e) => setContanciaDeMatriculaEgreso(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Carta de Compromiso */}
        <div className="flex flex-col">
          <label htmlFor="cartaCompromiso" className="text-sm font-medium text-gray-600 mb-1">
            Carta de Compromiso:
          </label>
          <input
            type="file"
            id="cartaCompromiso"
            onChange={(e) => setCartaCompromiso(e.target.files[0])}
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
            id="cartaRenuncia"
            onChange={(e) => setCartaRenuncia(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Codigo de Resolucion Jurados Facu */}
        <div className="flex flex-col">
          <label htmlFor="codigoResolucionJuradosFacu" className="text-sm font-medium text-gray-600 mb-1">
            Codigo de Resolucion Jurados Facu:
          </label>
          <input
            type="file"
            id="codigoResolucionJuradosFacu"
            onChange={(e) => setCodigoResolucionJuradosFacu(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Codigo de Resolucion Jurados Info */}
        <div className="flex flex-col">
          <label htmlFor="codigoResolucionJuradosInfo" className="text-sm font-medium text-gray-600 mb-1">
            Codigo de Resolucion Jurados Info:
          </label>
          <input
            type="file"
            id="codigoResolucionJuradosInfo"
            onChange={(e) => setCodigoResolucionJuradosInfo(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* N Expediente Resolucion Juados */}
        <div className="flex flex-col">
          <label htmlFor="nExpedienteResolucionJuados" className="text-sm font-medium text-gray-600 mb-1">
            N Expediente Resolucion Juados:
          </label>
          <input
            type="file"
            id="nExpedienteResolucionJuados"
            onChange={(e) => setNExpedienteResolucionJuados(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Codigo de Resolucion Asesor Facu */}
        <div className="flex flex-col">
          <label htmlFor="codigoResolucionAsesorFacu" className="text-sm font-medium text-gray-600 mb-1">
            Codigo de Resolucion Asesor Facu:
          </label>
          <input
            type="file"
            id="codigoResolucionAsesorFacu"
            onChange={(e) => setCodigoResolucionAsesorFacu(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Codigo de Resolucion Asesor Info */}
        <div className="flex flex-col">
          <label htmlFor="codigoResolucionAsesorInfo" className="text-sm font-medium text-gray-600 mb-1">
            Codigo de Resolucion Asesor Info:
          </label>
          <input
            type="file"
            id="codigoResolucionAsesorInfo"
            onChange={(e) => setCodigoResolucionAsesorInfo(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Envio de Resoluciones Asesor */}
        <div className="flex flex-col">
          <label htmlFor="envioDeResolucionesAsesor" className="text-sm font-medium text-gray-600 mb-1">
            Envio de Resoluciones Asesor:
          </label>
          <input
            type="file"
            id="envioDeResolucionesAsesor"
            onChange={(e) => setEnvioDeResolucionesAsesor(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Subir Archivos
        </button>
      </form>

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

export default Extras;