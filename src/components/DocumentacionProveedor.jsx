import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faDownload,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function DocumentacionProveedor() {
  const [data, setData] = useState([]);
  const [catalogoDocumentos, setCatalogoDocumentos] = useState([]);
  const [catalogoDocumentos2, setCatalogoDocumentos2] = useState([]);
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];
  const [filtroDocumentoId, setFiltroDocumentoId] = useState(0);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/documentotipos/vlist/301`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCatalogoDocumentos(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/documentotipos/vlist/300`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCatalogoDocumentos2(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  function getDocumentoByName(documentId) {
    const documento = catalogoDocumentos2.find(
      (documento) => documento.id === documentId
    );
    return documento ? documento.name : "Desconocida";
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/proveedores/${ultimoValor}/doctos`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // Ordena los datos por fecha de actualización (del más nuevo al más antiguo)
        const dataOrdenada = [...result].sort((a, b) => {
          const fechaA = new Date(a.fechaActualizacion);
          const fechaB = new Date(b.fechaActualizacion);
          return fechaB - fechaA;
        });
        setData(dataOrdenada);
      })
      .catch((error) => console.log("error", error));
  }, [ultimoValor]);

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const handleChangeFiltro = (e) => {
    setFiltroDocumentoId(parseInt(e.target.value));
  };

  // Filtrar los datos de la segunda tabla basados en el filtroDocumentoId
  const datosFiltradosSegundaTabla = data.filter((item) =>
    filtroDocumentoId === 0 ? true : item.documentoTipoId === filtroDocumentoId
  );


  return (
    <>
      {data ? (
        <div className="tabla-facturas-proveedor-container">
          <h2 style={{ marginLeft: "1rem" }}>Documentacion del proveedor</h2>
          <table className="table-to-print">
            <thead>
              <tr>
                <th colSpan="12">Lista de documentos obligatorios mas recientes</th>
              </tr>
              <tr>
                <th>#</th>
                <th style={{ width: "50px" }}>Tipo de documentacion</th>
                <th style={{ width: "150px" }}>
                  Ultima fecha de actualizacion
                </th>
                <th>Referencias</th>
                <th className="no-print" style={{ width: "100px" }}>
                  Archivo
                </th>
              </tr>
            </thead>
            <tbody>
              {catalogoDocumentos.map((item, index) => {
                const matchingData = data.find(dataItem => dataItem.documentoTipoId === item.id);

                return (
                  <tr key={index} style={{
                    backgroundColor: matchingData ? (((item.vigencia-matchingData.diasTranscurridosDesdeActualizacion) <= item.vigencia && (item.vigencia-matchingData.diasTranscurridosDesdeActualizacion) >= (item.vigencia*0.6)) ? "#81BF85"  
                    : (matchingData && (item.vigencia-matchingData.diasTranscurridosDesdeActualizacion) < (item.vigencia*0.6) && (item.vigencia-matchingData.diasTranscurridosDesdeActualizacion) >= (item.vigencia*0.3)) ? "#DDE366" 
                    : (matchingData && (item.vigencia-matchingData.diasTranscurridosDesdeActualizacion) < (item.vigencia*0.3) && (item.vigencia-matchingData.diasTranscurridosDesdeActualizacion) >= (item.vigencia*0.1)) ? "#EBAC57"
                    : "#EC9080") : ("")
                  }}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{matchingData ? formatFecha(matchingData.fechaActualizacion) : "N/a"}</td>
                    <td>{matchingData ? (matchingData.reference || "No hay referencias") : "N/a"}</td>
                    <td className="no-print">
                      {matchingData ? <a href={matchingData.fileUrl} target="blank" download={matchingData.fileUrl}>
                        <button className="free">
                          <FontAwesomeIcon icon={faDownload} /> Descargar documento
                        </button>
                      </a> : "No hay documento registrado"}
                    </td>
                  </tr>
                );
              })}
            </tbody>


          </table>
          &nbsp;

          <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
            <label htmlFor="filtroDocumento">Filtrar por tipo de documento: </label>
            <select
              id="filtroDocumento"
              onChange={handleChangeFiltro}
              value={filtroDocumentoId}
            >
              <option value={0}>Todos</option>
              {catalogoDocumentos2.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <table className="table-to-print">
            <thead>
              <tr>
                <th colSpan="12">Historial de documentos del proveedor</th>
              </tr>
              <tr>
                <th>#</th>
                <th style={{ width: "50px" }}>Tipo de documentacion</th>
                <th style={{ width: "150px" }}>
                  Ultima fecha de actualizacion
                </th>
                <th>Referencias</th>
                <th className="no-print" style={{ width: "100px" }}>
                  Archivo
                </th>
              </tr>
            </thead>
            <tbody>
              {datosFiltradosSegundaTabla.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{getDocumentoByName(item.documentoTipoId)}</td>
                  <td>{formatFecha(item.fechaActualizacion)}</td>
                  <td>{item.reference || "Sin referencias"}</td>
                  <td className="no-print">
                    <a
                      href={item.fileUrl}
                      target="blank"
                      download={item.fileUrl}
                    >
                      <button className="free">
                        <FontAwesomeIcon icon={faDownload} /> Descargar documento
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          
        </div>
      ) : (
        <h1>Cargando</h1>
      )}
    </>
  );
}

export default DocumentacionProveedor;
