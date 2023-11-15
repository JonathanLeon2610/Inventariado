import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFile,
  faHome,
  faUser,
  faBuildingColumns,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import DatosGenerales from "./DatosGenerales";
import DatosBancarios from "./DatosBancarios";
import DomicilioFiscal from "./DomicilioFiscal";
import DatosRepresentante from "./DatosRepresentante";
import EditarDocumentacion from "./EditarDocumentacion";
import DocumentacionProveedor from "./DocumentacionProveedor";
function EditProveedor() {
  const [currentPage, setCurrentPage] = useState("generales");

  const renderPage = () => {
    switch (currentPage) {
      case "generales":
        return <DatosGenerales />;
      case "datosBancarios":
        return <DatosBancarios />;
      case "domicilioFiscal":
        return <DomicilioFiscal />;
      case "datosRepresentante":
        return <DatosRepresentante />;
      case "editarDocumentacion":
        return <EditarDocumentacion />;
      case "verDocumentacion":
        return <DocumentacionProveedor />;
    }
  };
  return (
    <>
      <div>
        <div className={`sidebar`}>
          <img
            src={import.meta.env.VITE_REACT_APP_API_URL + "images/logotipo.png"}
            alt="No carga"
          />
          <ul style={{ color: "white", cursor: "pointer" }}>
            <h2>Datos del proveedor</h2>
            <li onClick={() => setCurrentPage("generales")}>
              <FontAwesomeIcon icon={faFile} /> Generales
            </li>
            <li onClick={() => setCurrentPage("domicilioFiscal")}>
              <FontAwesomeIcon icon={faHome} /> Domicilio Fiscal
            </li>
            <li onClick={() => setCurrentPage("datosRepresentante")}>
              <FontAwesomeIcon icon={faUser} /> Datos de representante
            </li>
            <li onClick={() => setCurrentPage("datosBancarios")}>
              <FontAwesomeIcon icon={faBuildingColumns} /> Datos Bancarios
            </li>
            <>
              <li className="dropdown">
                <span className="dropdown-toggle">
                  <FontAwesomeIcon icon={faFolder} /> Documentacion
                </span>
                <ul className="dropdown-menu">
                  <li
                    onClick={() => {
                      setCurrentPage("editarDocumentacion");
                    }}
                  >
                    Agregar documentacion
                  </li>
                  <li
                    onClick={() => {
                      setCurrentPage("verDocumentacion");
                    }}
                  >
                    Ver documentacion
                  </li>
                </ul>
              </li>
            </>
            <li onClick={() => window.history.back()}>
              <FontAwesomeIcon icon={faArrowLeft} /> Regresar
            </li>
          </ul>
        </div>
        <div className={`content`}>{renderPage()}</div>
      </div>
    </>
  );
}

export default EditProveedor;
