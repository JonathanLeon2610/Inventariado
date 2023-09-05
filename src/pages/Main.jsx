import { useState, useEffect } from "react";
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
import Swal from "sweetalert2";
import EditBienInventariable from "./EditBienInventarible";

function Main() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("inventariable"); // Página inicial

  // Add a state to track if the token exists in local storage
  const [setTokenExists] = useState(true);

  // Check for the existence of the "token" item in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTokenExists(false);
      // Redirect to the login page if the token doesn't exist
      window.location.href = "/login";
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const showAlert = () => {
    Swal.fire({
      title: "¡Estas Seguro?",
      text: "Se cerrarà tu sesion actual",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Salir",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });
  };

  useEffect(() => {
    const currentUTC = new Date().toISOString();
    const expirationValue = localStorage.getItem("expiration");
    const expirationDate = new Date(expirationValue);

    // Calcula la diferencia en milisegundos entre la hora actual y la hora de expiración
    const timeDiff = expirationDate.getTime() - new Date(currentUTC).getTime();

    // Define el tiempo límite, en este caso, 5 minutos antes de la expiración
    const fiveMinutes = 5 * 60 * 1000; // 5 minutos en milisegundos

    // Compara si la diferencia es menor o igual a 5 minutos
    if (timeDiff <= fiveMinutes) {
      // Realiza la acción que desees cuando falten 5 minutos
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

      fetch("https://192.168.10.100/api/cuentas/RenovarToken", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          localStorage.setItem("token", result.token);
          localStorage.setItem("expiration", result.expiration);
        })
        .catch((error) => console.log("error", error));
    }
  }, []);

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
        <img onClick={toggleSidebar} src="https://192.168.10.100/images/logotipo.png" alt="No carga" />
        <ul style={{ color: "white", cursor: "pointer" }}>
          <li onClick={() => setCurrentPage("inventariable")}>
            <FontAwesomeIcon icon={faShop} /> Inventariable
          </li>
          <li onClick={() => setCurrentPage("noInventariable")}>
            <FontAwesomeIcon icon={faStore} /> No Inventariable (Almacen)
          </li>
          <li onClick={() => setCurrentPage("asignacionResguardos")}>
            <FontAwesomeIcon icon={faBookBookmark} /> Asignacion de Resguardos
          </li>
          <li onClick={() => setCurrentPage("proveedores")}>
            <FontAwesomeIcon icon={faTruckField} /> Proveedores
          </li>
          <li onClick={() => setCurrentPage("historialFacturas")}>
              <FontAwesomeIcon icon={faMoneyBill} /> Historial de Facturas
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
