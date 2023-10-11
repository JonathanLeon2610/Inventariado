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
import Swal from "sweetalert2";
import EditBienInventariable from "./EditBienInventarible";
import SubirFactura from "./SubirFactura";
import VerFacturas from "./VerFacturas";
import AdjuntarPDF from "./AdjuntarPDF";

function Main() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentPage"));

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
    const timeDiff = expirationDate.getTime() - new Date(currentUTC).getTime();
    const fiveMinutes = 5 * 60 * 1000; 

    if (timeDiff <= fiveMinutes) {
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
        import.meta.env.VITE_REACT_APP_API_URL + "api/cuentas/RenovarToken",
        requestOptions
      )
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
      case "subirFactura":
        return <SubirFactura />;
      case "adjuntarPDF":
        return <AdjuntarPDF />;
      case "verFacturas":
        return <VerFacturas />;
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
    }
  };

  return (
    <div>
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <img
          onClick={toggleSidebar}
          src={import.meta.env.VITE_REACT_APP_API_URL + "images/logotipo.png"}
          alt="No carga"
        />
        <ul style={{ color: "white", cursor: "pointer" }}>
          <li onClick={() => {
            setCurrentPage("inventariable")
            localStorage.setItem("currentPage","inventariable")
            }}>
            <FontAwesomeIcon icon={faShop} /> Inventariable
          </li>
          <li onClick={() => {
            setCurrentPage("noInventariable")
            localStorage.setItem("currentPage","noInventariable")
            }}>
            <FontAwesomeIcon icon={faStore} /> No Inventariable (Almacen)
          </li>
          <li className="dropdown">
            <span className="dropdown-toggle">
              <FontAwesomeIcon icon={faMoneyBill} /> Facturas (CFD)
            </span>
            <ul className="dropdown-menu">
              <li onClick={() => {
                setCurrentPage("subirFactura")
                localStorage.setItem("currentPage","subirFactura");
                }}>
                Registrar (XML)
              </li>
              <li onClick={() => {
                setCurrentPage("adjuntarPDF")
                localStorage.setItem("currentPage","adjuntarPDF");
                }}>
                Adjuntar (PDF)
              </li>
              <li onClick={() => {
                setCurrentPage("verFacturas")
                localStorage.setItem("currentPage", "verFacturas")
                }}>Visualizar</li>
            </ul>
          </li>
          <li onClick={() => {
            setCurrentPage("asignacionResguardos")
            localStorage.setItem("currentPage", "asignacionResguardos")
            }}>
            <FontAwesomeIcon icon={faBookBookmark} /> Asignación de Resguardos
          </li>
          <li onClick={() => {
            setCurrentPage("proveedores")
            localStorage.setItem("currentPage","proveedores")
            }}>
            <FontAwesomeIcon icon={faTruckField} /> Proveedores
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
