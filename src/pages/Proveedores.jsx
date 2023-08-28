import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Proveedores() {
  return (
    <div>
      <h2>Asignacion de Resguardos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Correo electronico</th>
            <th>RFC</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Coca cola</td>
            <td>612000000</td>
            <td>Coca@gmail.com</td>
            <td>SDF16516565ASD</td>
            <td>
              <Link to="/edit-proveedor">
                <button className="free"><FontAwesomeIcon icon={faArrowRight} /> Editar Proveedor</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Proveedores;
