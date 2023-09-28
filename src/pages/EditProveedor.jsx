import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShop,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import DatosGenerales from "../components/Proveedores/DatosGenerales";
import DatosBancarios from "../components/Proveedores/DatosBancarios";
function EditProveedor() {
  const [currentPage, setCurrentPage] = useState("generales"); // Estado local para la página actual

  const renderPage = () => {
    switch (currentPage) {
      case "generales":
        return <DatosGenerales />;
      case "datosBancarios":
        return <DatosBancarios />;
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
            <FontAwesomeIcon icon={faShop} /> Generales
          </li>
          <li onClick={() => setCurrentPage("datosBancarios")}>
            <FontAwesomeIcon icon={faShop} /> Datos Bancarios
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
