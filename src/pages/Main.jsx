import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faBookBookmark,
  faTruckField,
  faMoneyBill,
  faUser,
  faHome,
  faBoxArchive
} from "@fortawesome/free-solid-svg-icons";
import Inventariables from "../components/Bienes/Inventariable";
import NoInventariables from "../components/Bienes/NoInventariables";
import AsignacionResguardos from "../components/Bienes/AsignacionResguardos";
import Proveedores from "../components/Proveedores/Proveedores";
import EditProveedor from "../components/Proveedores/EditProveedor";
import Swal from "sweetalert2";
import EditBienInventariable from "../components/Bienes/EditBienInventarible";
import SubirFactura from "../components/Facturas/SubirFactura";
import VerFacturas from "../components/Facturas/VerFacturas";
import AdjuntarPDF from "../components/Facturas/AdjuntarPDF";
import Inicio from "./Inicio";
import RequisicionDeBien from "../components/SolicitudMaterial/RequisicionDeBien";
import MisSolicitudes from "../components/SolicitudMaterial/MisSolicitudes";
import AgregarBienInventariable from "../components/Bienes/AgregarBienInventariable";
import RelacionarBienFactura from "../components/Bienes/RelacionarBienFactura";
import VerResguardos from "../components/Bienes/VerResguardos";
import SubirNomina from "../components/Nominas/SubirNomina";
import VerNominas from "../components/Nominas/VerNominas";

function Main() {
  // eslint-disable-next-line no-unused-vars
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage")
  );

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
      case "registrarBien":
        return <AgregarBienInventariable/>;
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
      case "requisicionMaterial":
        return <RequisicionDeBien />;
      case "misSolicitudes":
        return <MisSolicitudes />;
      case "relacionarBienFactura":
        return <RelacionarBienFactura />;
      case "verResguardos":
        return <VerResguardos />;
      case "subirNomina":
        return <SubirNomina />;
      case "verNominas":
        return <VerNominas />;
      case "inicio":
        return <Inicio />;
    }
  };

  return (
    <>
      <div>
        <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
          <img
            src={import.meta.env.VITE_REACT_APP_API_URL + "images/logotipo.png"}
            alt="No carga"
          />
          <p style={{ color: "white" }}>{localStorage.getItem("nombre")}</p>
          <ul style={{ color: "white", cursor: "pointer" }}>
            <li
              onClick={() => {
                setCurrentPage("inicio");
                localStorage.setItem("currentPage", "inicio");
              }}
            >
              <FontAwesomeIcon icon={faHome} /> Inicio
            </li>

            {/* --------------------------------------------------------------- */}

            {/* Nomina */}

            {localStorage.getItem("role").includes(import.meta.env.VITE_REACT_APP_SUPERADMIN) || localStorage.getItem("role").includes(import.meta.env.VITE_REACT_APP_DA_RECHUM) ? (
              <>
              <li className="dropdown">
                  <span className="dropdown-toggle">
                    <FontAwesomeIcon icon={faMoneyBill} /> Nomina (CFD)
                  </span>
                  <ul className="dropdown-menu">
                          <>
                            <li
                              onClick={() => {
                                setCurrentPage("subirNomina");
                                localStorage.setItem(
                                  "currentPage",
                                  "subirNomina"
                                );
                              }}
                            >
                              Registrar (XML)
                            </li>
                          </>
                    <li
                      onClick={() => {
                        setCurrentPage("verNominas");
                        localStorage.setItem("currentPage", "verNominas");
                      }}
                    >
                      Visualizar
                    </li>
                  </ul>
            </li>
              </>
            ): ("")}
            

            {/* Inventariable */}
            {localStorage
              .getItem("role")
              .includes(import.meta.env.VITE_REACT_APP_DA_RECMAT) ||
            localStorage
              .getItem("role")
              .includes(import.meta.env.VITE_REACT_APP_SUPERADMIN) ? (
              <>

                <li className="dropdown">
                <span className="dropdown-toggle">
                  <FontAwesomeIcon icon={faBoxArchive} /> Inventariable
                </span>
                <ul className="dropdown-menu">
                  <li
                    onClick={() => {
                      setCurrentPage("inventariable");
                      localStorage.setItem("currentPage", "inventariable");
                    }}
                  >
                    Ver inventario
                  </li>
                  <li
                    onClick={() => {
                      setCurrentPage("registrarBien");
                      localStorage.setItem("currentPage", "registrarBien");
                    }}
                  >
                    Registrar nuevo bien
                  </li>
                  <li
                    onClick={() => {
                      setCurrentPage("relacionarBienFactura");
                      localStorage.setItem("currentPage", "relacionarBienFactura");
                    }}
                  >
                    Relacionar bien y factura
                  </li>
                </ul>
              </li>

              {/* No inventariable */}
                {/* <li
                  onClick={() => {
                    setCurrentPage("noInventariable");
                    localStorage.setItem("currentPage", "noInventariable");
                  }}
                >
                  <FontAwesomeIcon icon={faStore} /> No Inventariable (Almacen)
                </li> */}

                {/* --------------------------------------------------------------- */}

                {/* Asignacion de resguardos */}
                {/* <li className="dropdown">
                <span className="dropdown-toggle">
                  <FontAwesomeIcon icon={faBookBookmark} /> Asignación de
                    Resguardos
                </span>
                <ul className="dropdown-menu">
                  <li
                    onClick={() => {
                      setCurrentPage("asignacionResguardos");
                      localStorage.setItem("currentPage", "asignacionResguardos");
                    }}
                  >
                    Manejo de resguardo
                  </li>
                  <li
                    onClick={() => {
                      setCurrentPage("verResguardos");
                      localStorage.setItem("currentPage", "verResguardos");
                    }}
                  >
                    Ver resguardo por personal
                  </li>
                </ul>
                </li> */}
                {/* --------------------------------------------------------------- */}
              </>
            ) : (
              ""
            )}

            {/* --------------------------------------------------------------- */}

            {/* Facturas */}

            {localStorage
              .getItem("role")
              .includes(import.meta.env.VITE_REACT_APP_DA_COMPRAS) ||
            localStorage
              .getItem("role")
              .includes(import.meta.env.VITE_REACT_APP_SUPERADMIN) ? (
              <>
                <li className="dropdown">
                  <span className="dropdown-toggle">
                    <FontAwesomeIcon icon={faMoneyBill} /> Facturas (CFD)
                  </span>
                  <ul className="dropdown-menu">
                    {localStorage
                      .getItem("role")
                      .includes(import.meta.env.VITE_REACT_APP_ADM_COMPRAS) ||
                    localStorage
                      .getItem("role")
                      .includes(import.meta.env.VITE_REACT_APP_AUX_COMPRAS) ||
                    localStorage
                      .getItem("role")
                      .includes(import.meta.env.VITE_REACT_APP_SUPERADMIN) ? (
                      <>
                            <li
                              onClick={() => {
                                setCurrentPage("subirFactura");
                                localStorage.setItem(
                                  "currentPage",
                                  "subirFactura"
                                );
                              }}
                            >
                              Registrar (XML)
                            </li>
                            <li
                              onClick={() => {
                                setCurrentPage("adjuntarPDF");
                                localStorage.setItem(
                                  "currentPage",
                                  "adjuntarPDF"
                                );
                              }}
                            >
                              Adjuntar (PDF)
                            </li>
                      </>
                    ) : (
                      ""
                    )}
                    <li
                      onClick={() => {
                        setCurrentPage("verFacturas");
                        localStorage.setItem("currentPage", "verFacturas");
                      }}
                    >
                      Visualizar
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {/* --------------------------------------------------------------- */}

            {/* Proveedores */}

            {localStorage
              .getItem("role")
              .includes(import.meta.env.VITE_REACT_APP_DA_COMPRAS) ||
            localStorage
              .getItem("role")
              .includes(import.meta.env.VITE_REACT_APP_SUPERADMIN) ? (
              <>
                <li
                  onClick={() => {
                    setCurrentPage("proveedores");
                    localStorage.setItem("currentPage", "proveedores");
                  }}
                >
                  <FontAwesomeIcon icon={faTruckField} /> Proveedores
                </li>
              </>
            ) : (
              ""
            )}

            {/* --------------------------------------------------------------- */}

            {/* Requisicion de material */}
            {/* <>
              <li className="dropdown">
                <span className="dropdown-toggle">
                  <FontAwesomeIcon icon={faBoxArchive} /> Requisicion Material
                </span>
                <ul className="dropdown-menu">
                  <li
                    onClick={() => {
                      setCurrentPage("requisicionMaterial");
                      localStorage.setItem("currentPage", "requisicionMaterial");
                    }}
                  >
                    Solicitar
                  </li>
                  <li
                    onClick={() => {
                      setCurrentPage("misSolicitudes");
                      localStorage.setItem("currentPage", "misSolicitudes");
                    }}
                  >
                    Ver mis solicitudes
                  </li>
                </ul>
              </li>
            </> */}
            {/* --------------------------------------------------------------- */}

            <li onClick={showAlert}>
              <FontAwesomeIcon icon={faUser} /> Cerrar Sesión
            </li>
          </ul>
        </div>
        <div className={`content ${sidebarCollapsed ? "content-shifted" : ""}`}>
          {renderPage()}
        </div>
      </div>
    </>
  );
}

export default Main;
