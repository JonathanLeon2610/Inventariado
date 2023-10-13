import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFile,
  faHome,
  faUser,
  faBuildingColumns,
  faFolder
} from "@fortawesome/free-solid-svg-icons";
import DatosGenerales from "../components/Proveedores/DatosGenerales";
import DatosBancarios from "../components/Proveedores/DatosBancarios";
import DomicilioFiscal from "../components/Proveedores/DomicilioFiscal";
import DatosRepresentante from "../components/Proveedores/DatosRepresentante";
import EditarDocumentacion from "../components/Proveedores/EditarDocumentacion";
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
          <li onClick={() => setCurrentPage("editarDocumentacion")}>
            <FontAwesomeIcon icon={faFolder} /> Documentacion
          </li>
          <li onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faArrowLeft} /> Regresar
          </li>
          

        </ul>
      </div>
      <div className={`content`}>
        {renderPage()}
      </div>
    </div>
    </>
  );
}

export default EditProveedor;
