import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function AsignacionResguardos() {
    return (
      <div>
        <h2>Asignacion de Resguardos</h2>
        <table>
          <thead>
            <tr>
              <th>Articulo</th>
              <th>Asignado a</th>
              <th>Fecha de asignacion</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Computadora 1</td>
              <td>Pedro</td>
              <td>26/10/23</td>
              <td><button className="free"><FontAwesomeIcon icon={faArrowRight} /> Liberar Articulo</button></td>
            </tr>
            <tr>
              <td>Computadora 2</td>
              <td>N/A</td>
              <td>N/A</td>
              <td><button className="set"><FontAwesomeIcon icon={faArrowRight} /> Asignar Articulo</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default AsignacionResguardos;
  