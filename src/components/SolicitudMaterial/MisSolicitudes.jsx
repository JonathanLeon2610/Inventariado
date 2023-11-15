import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function MisSolicitudes() {

  const handleSubmit = () =>{
    Swal.fire({
      title: 'Confirmar solicitud',
      showCancelButton: true,
      confirmButtonText: 'Si, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Solicitud realizada correctamente!', '', 'success')
      }
    })
  }

  return (
    <>
      <div>
        <h2>Mis Solicitudes</h2>
        <div className="filter-form">
          <label>Buscar:</label>
          <input
            type="text"
            name="noInventario"
            placeholder="Introducir No. de solicitud"
          />

          <button className="add" style={{ backgroundColor: "#0056b3" }} onClick={handleSubmit}>
            Buscar solicitud <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: "150px" }}>No. Solicitud</th>
              <th style={{ width: "150px" }}>Fecha</th>
              <th>Materiales solicitados</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>PZA</td>
              <td>Prueba</td>
            </tr>
            <tr>
              <td>Computadora 2</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MisSolicitudes;
