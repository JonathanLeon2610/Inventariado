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
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];

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
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/documentotipos/vlist/5`,
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
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/proveedores/${ultimoValor}/doctos`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  function getDocumentoByName(documentId) {
    const documento = catalogoDocumentos.find(
      (documento) => documento.id === documentId
    );
    return documento ? documento.name : "Desconocida";
  }

  return (
    <>
      {data ? (
        <div className="tabla-facturas-proveedor-container">
          <h2 style={{ marginLeft: "1rem" }}>Documentacion del proveedor</h2>
          <button
            className="add no-print"
            style={{ marginLeft: "1rem", backgroundColor: "gray" }}
            onClick={() => (window.location.href = "/main")}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Regresar
          </button>
          <button
            className="import"
            style={{
              backgroundColor: "orange",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
            onClick={() => window.print()}
          >
            <FontAwesomeIcon icon={faPrint} /> Imprimir Tabla
          </button>

          <table className="table-to-print">
            <thead>
              <tr>
                <th colSpan="12">Lista de documentos obligatorios</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Tipo de documentacion</th>
                <th>Ultima fecha de actualizacion</th>
                <th>Referencias</th>
                <th className="no-print">Archivo</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <>
                  <tr key={index} style={{backgroundColor:"#DFD426"}}>
                    <td>{index + 1}</td>
                    <td>{getDocumentoByName(item.documentoTipoId)}</td>
                    <td>{formatFecha(item.fechaActualizacion)}</td>
                    <td>{item.reference}</td>
                    <td className="no-print">
                      <a
                        href={item.fileUrl}
                        target="blank"
                        download={item.fileUrl}
                      >
                        <button className="free">
                          <FontAwesomeIcon icon={faDownload} /> Descargar
                          documento
                        </button>
                      </a>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <hr />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <table className="table-to-print">
            <thead>
              <tr>
                <th colSpan="12">Lista de documentos extras</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Tipo de documentacion</th>
                <th>Ultima fecha de actualizacion</th>
                <th>Referencias</th>
                <th className="no-print">Archivo</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{getDocumentoByName(item.documentoTipoId)}</td>
                    <td>{formatFecha(item.fechaActualizacion)}</td>
                    <td>{item.reference}</td>
                    <td className="no-print">
                      <a
                        href={item.fileUrl}
                        target="blank"
                        download={item.fileUrl}
                      >
                        <button className="free">
                          <FontAwesomeIcon icon={faDownload} /> Descargar
                          documento
                        </button>
                      </a>
                    </td>
                  </tr>
                </>
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
