import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faShop,
  faBookBookmark,
  faTruckField,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Inventariables from "../pages/Inventariable";
import NoInventariables from "../pages/NoInventariables";
import AsignacionResguardos from "../pages/AsignacionResguardos";
import Proveedores from "../pages/Proveedores";
import EditProveedor from "../pages/EditProveedor";
import Login from "../pages/Login";
import Swal from 'sweetalert2';
import EditBienInventariable from "./EditBienInventarible";

function Main() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("inventariable"); // Página inicial

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const showAlert = () => {
    Swal.fire({
        title: '¡Estas Seguro?',
        text: "Se cerrarà tu sesion actual",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Salir',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            (window.location.href = "/login")
        }
      })
  };

  const renderPage = () => {
    switch (currentPage) {
      case "inventariable":
        return <Inventariables />;
      case "noInventariable":
        return <NoInventariables />;
      case "asignacionResguardos":
        return <AsignacionResguardos />;
      case "proveedores":
        return <Proveedores />;
      case "editProveedor":
        return <EditProveedor />;
      case "editBienInventariable":
        return <EditBienInventariable />;
      default:
        return <Login />; // Página inicial por defecto
    }
  };

  return (
    <div>
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <img
          onClick={toggleSidebar}
          src="URL de tu logotipo"
          alt="No carga"
        />
        <ul style={{color:"white",cursor:"pointer"}}>
          <li onClick={() => setCurrentPage("inventariable")}>
              <FontAwesomeIcon icon={faShop} /> Inventariable
          </li>
          <li  onClick={() => setCurrentPage("noInventariable")}>
              <FontAwesomeIcon icon={faStore} /> No Inventariable (Almacen)
          </li>
          <li onClick={() => setCurrentPage("asignacionResguardos")}>
              <FontAwesomeIcon icon={faBookBookmark} /> Asignacion de Resguardos
          </li>
          <li onClick={() => setCurrentPage("proveedores")}>
              <FontAwesomeIcon icon={faTruckField} /> Proveedores
          </li>
          <li>
            <button onClick={() => setCurrentPage("historialFacturas")}>
              <FontAwesomeIcon icon={faMoneyBill} /> Historial de Facturas
            </button>
          </li>
          <li onClick={showAlert}>
            <FontAwesomeIcon icon={faUser} /> Cerrar Sesión
        </li>
        </ul>
      </div>
      <div className={`content ${sidebarCollapsed ? "content-shifted" : ""}`}>
        {renderPage()}
      </div>
    </div>
  );
}

export default Main;
