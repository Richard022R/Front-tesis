import React, { useState, useEffect } from "react";

// SVG Icons as inline components
const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const DownloadIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const Inicio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tesis, setTesis] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if(userInfo.status !== 0) {

      const fetchUserFiles = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/users/${userInfo.userId}/files`
          );
          if (!response.ok) {
            throw new Error("Error al obtener los archivos del usuario");
          }
          const result = await response.json();
          setTesis(result.data?.tesis || null);
        } catch (error) {
          console.error("Error al obtener los archivos:", error.message);
        }
      };
      
      fetchUserFiles();
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownloadFile = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error descargando archivo:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En Proceso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Aprobado':
        return 'bg-green-100 text-green-800';
      case 'Rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para generar secciones dinámicamente
  const generateProcedureSections = () => {
    const sections = [];

    // Anexo 11 siempre presente
    if (tesis?.anexo11) {
      sections.push({
        name: 'Anexo 11',
        status: tesis.status,
        documents: [
          { 
            name: 'Dictamen Aprobación Proyecto', 
            file: tesis.anexo11.dictamenAprobacionProyecto 
          },
          { 
            name: 'Informe Comité Ética', 
            file: tesis.anexo11.informeComiteEtica 
          }
        ]
      });
    }

    // Anexo 30 opcional
    if (tesis?.anexo30) {
      const anexo30Docs = Object.entries(tesis.anexo30)
        .filter(([key, value]) => value && typeof value === 'object')
        .map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
          file: value
        }));

      sections.push({
        name: 'Anexo 30',
        status: 'Pendiente',
        documents: anexo30Docs
      });
    }

    // Extras opcional
    if (tesis?.extras) {
      const extrasDocs = Object.entries(tesis.extras)
        .filter(([key, value]) => value && typeof value === 'object')
        .map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
          file: value
        }));

      sections.push({
        name: 'Extras',
        status: 'Pendiente',
        documents: extrasDocs
      });
    }

    return sections;
  };

  const procedureSections = tesis ? generateProcedureSections() : [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Estado de Tesis</h2>
          <p className="text-sm text-gray-600">
            Etapa actual: {tesis?.status || 'No disponible'}
          </p>
        </div>
      </div>

      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar trámites"
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="p-4 text-gray-600">Sección</th>
                <th className="p-4 text-gray-600">Estado</th>
                <th className="p-4 text-gray-600">
                  <div className="flex items-center">
                    Documentos <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {procedureSections.map((section, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{section.name}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      section.name === 'Anexo 11' 
                        ? getStatusColor(section.status || 'Sin Estado')
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {section.status || 'Pendiente'}
                    </span>
                  </td>
                  <td className="p-4">
                    {section.documents && section.documents.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {section.documents.map((doc, docIndex) => (
                          <button
                            key={docIndex}
                            onClick={() => doc.file && handleDownloadFile(doc.file.fileUrl, doc.file.fileName)}
                            className={`text-blue-500 hover:text-blue-700 flex items-center gap-2 ${
                              !doc.file ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={!doc.file}
                          >
                            <DownloadIcon className="h-4 w-4" />
                            {doc.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Sin documentos</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span>Items por página:</span>
            <select className="border rounded p-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;