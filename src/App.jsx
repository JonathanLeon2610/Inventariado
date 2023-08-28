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
import { BrowserRouter as Router, Route, Link,Routes } from "react-router-dom";
import Inventariables from "./pages/Inventariable";
import NoInventariables from "./pages/NoInventariables";
import AsignacionResguardos from "./pages/AsignacionResguardos";
import Proveedores from "./pages/Proveedores";
import EditProveedor from "./pages/EditProveedor";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <img
          onClick={toggleSidebar}
          src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.tjabcs.gob.mx%2Fwp-content%2Fthemes%2FTJABCS%2Fimg%2Flogotipo.png&tbnid=e8eMkqHtM6lkEM&vet=12ahUKEwiy28PL6P-AAxVZMEQIHRJnC5EQMygAegQIARBP..i&imgrefurl=https%3A%2F%2Fwww.tjabcs.gob.mx%2F&docid=U-I9mdoAyGB9GM&w=551&h=643&q=tjabcs&ved=2ahUKEwiy28PL6P-AAxVZMEQIHRJnC5EQMygAegQIARBP"
          alt="No carga"
        />
        <ul>
          <li>
            <Link to="/inventariable">
              <FontAwesomeIcon icon={faShop} /> Inventariable
            </Link>
          </li>
          <li>
            <Link to="/NoInventariable">
              <FontAwesomeIcon icon={faStore} /> No Inventariable (Almacen)
            </Link>
          </li>
          <li>
            <Link to="/AsignacionResguardos">
              <FontAwesomeIcon icon={faBookBookmark} /> Asignacion de Resguardos
            </Link>
          </li>
          <li>
            <Link to="/Proveedores">
              <FontAwesomeIcon icon={faTruckField} /> Proveedores
            </Link>
          </li>
          <li>
            <Link to="/historial-facturas">
              <FontAwesomeIcon icon={faMoneyBill} /> Historial de Facturas
            </Link>
          </li>
          <li>
            <Link to="/cerrar-sesion">
              <FontAwesomeIcon icon={faUser} /> Cerrar Sesion
            </Link>
          </li>
        </ul>
      </div>
      <div className={`content ${sidebarCollapsed ? "content-shifted" : ""}`}>
        <Routes>
          <Route path="/inventariable" element={<Inventariables/>} />
          <Route path="/NoInventariable" element={<NoInventariables/>} />
          <Route
            path="/AsignacionResguardos"
            element={<AsignacionResguardos/>}
          />
          <Route path="/Proveedores" element={<Proveedores/>} />
          <Route path="/edit-proveedor" element={<EditProveedor/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
