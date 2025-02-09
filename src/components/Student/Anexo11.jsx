import React, { useState, useEffect } from "react";

const Anexo11 = () => {
  const [informeComiteEtica, setInformeComiteEtica] = useState(null);
  const [dictamenAprobacionProyecto, setDictamenAprobacionProyecto] =
    useState(null);
  const [tesisId, setTesisId] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const updateUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return logout();
  
        const response = await fetch('http://localhost:3000/api/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          localStorage.setItem('userInfo', JSON.stringify(data.user));
        } else {
          console.error(data.message);
          logout();
        }
      } catch (error) {
        console.error("Error al obtener los archivos:", error.message);
        logout();
      }
    };
  
    updateUserInfo();
  }, []);
  

  // Cargar los archivos al iniciar la aplicación
  useEffect(() => {
    const fetchTesis = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/tesis/user/${userInfo.userId}`
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

  // Cargar los archivos cuando se actualice la tesis
  useEffect(() => {
    const fetchDocumentos = async () => {
      if (!tesisId) return; // Espera a que `tesisId` esté disponible
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/tesis/anexo11/${tesisId}`
        );
        const data = await response.json();
        if (response.ok) {
          setDocumentos(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error al obtener los documentos:", error);
      }
    };

    fetchDocumentos();
  }, [tesisId]);

  const handleSubmit = async (e) => {
    // e.preventDefault(); // Prevenir comportamiento por defecto del formulario
  
    const formData = new FormData();
    formData.append("userId", userInfo.userId); // Agregar userId al formulario
  
    if (informeComiteEtica) {
      formData.append("informeComiteEtica", informeComiteEtica); // Documento obligatorio
    }
  
    if (dictamenAprobacionProyecto) {
      formData.append("dictamenAprobacionProyecto", dictamenAprobacionProyecto); // Documento obligatorio
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/v1/tesis", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Obtener datos del servidor
  
        // Guardar los datos del usuario en el localStorage
        localStorage.setItem("userInfo", JSON.stringify(responseData.user));
  
        // Mostrar mensaje de éxito
        alert("Tesis creada exitosamente");
  
        // Limpiar el estado de los archivos
        setInformeComiteEtica(null);
        setDictamenAprobacionProyecto(null);
  
        // Resetear el formulario
        if (e.target && typeof e.target.reset === "function") {
          e.target.reset();
        }
      } else {
        const errorData = await response.json();
        console.error("Error en la respuesta:", errorData);
        alert(`Error: ${errorData.message || "No se pudo crear la tesis"}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al enviar los documentos. Verifique su conexión o contacte soporte.");
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Crear Tesis con Documentos del Anexo 11
      </h1>

      {userInfo.status === 0 && (
        <form onSubmit={() => handleSubmit()} className="space-y-4">
          <div>
            <label
              htmlFor="informeComiteEtica"
              className="block text-sm font-medium text-gray-700"
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
              className="block text-sm font-medium text-gray-700"
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subir Archivos
          </button>
        </form>
      )}

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Documentos Subidos</h2>
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
      </section>
    </div>
  );
};

export default Anexo11;
