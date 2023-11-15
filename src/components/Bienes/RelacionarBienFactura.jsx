import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";

function RelacionarBienFactura() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Modal CSS (Estilos de ejemplo)
  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, 50%)", // Cambio de 50% a 0% para la animación
    transition: "transform 0.5s", // Duración de la animación
    backgroundColor: "white",
    padding: "20px",
    width: "90%", // Cambiar el ancho del modal
    height: "40rem",
    overflowY: "auto",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    zIndex: 1, // Asegura que el modal esté en la parte superior
  };

  // Fondo oscuro CSS (Estilos de ejemplo)
  const backdropStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)", // Fondo oscuro transparente inicial
    transition: "background-color 1.0s", // Duración de la animación
    zIndex: 0, // Asegura que esté detrás del modal
  };

  // Cambia los estilos del modal y del fondo oscuro al abrir o cerrar
  const modalAnimationStyles = isModalOpen
    ? { ...modalStyles, transform: "translate(-50%, -50%)" }
    : modalStyles;

  const backdropAnimationStyles = isModalOpen
    ? { ...backdropStyles, backgroundColor: "rgba(0, 0, 0, 0.5)" }
    : backdropStyles;

  const handleSubmit = () => {
    Swal.fire({
      title: "Confirmar solicitud",
      showCancelButton: true,
      confirmButtonText: "Si, confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Solicitud realizada correctamente!", "", "success");
      }
    });
  };

  return (
    <>
      <div>
        <h2>Relacionar bien y factura</h2>
        <div className="filter-form">
          <label>Buscar por No.inventario:</label>
          <input
            type="text"
            name="noInventario"
            placeholder="Introducir No.Inventario"
          />
          <button className="add">
            Buscar <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: "150px" }}># Inventario</th>
              <th>Descripcion</th>
              <th style={{ width: "150px" }}>Modelo</th>
              <th style={{ width: "150px" }}>Costo</th>
              <th style={{ width: "150px" }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>PZA</td>
              <td>Prueba</td>
              <td>$1500</td>
              <td>
                <button
                  onClick={openModal}
                  className="add"
                  style={{ backgroundColor: "orange" }}
                >
                  <FontAwesomeIcon icon={faEye} /> Buscar factura
                </button>
              </td>
            </tr>
            <tr>
              <td>Computadora 2</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>$1500</td>
              <td>
                <button
                  onClick={openModal}
                  className="add"
                  style={{ backgroundColor: "orange" }}
                >
                  <FontAwesomeIcon icon={faEye} /> Buscar factura
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fondo oscuro */}
      {isModalOpen && <div style={backdropAnimationStyles}></div>}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" style={modalAnimationStyles}>
          <span className="close" onClick={closeModal}>
            <p>Cerrrar &times;</p>
          </span>
          <table>
            <thead>
              <tr>
                <th >UUID</th>
                <th >Proveedor</th>
                <th style={{ width: "150px" }}>Folio</th>
                <th style={{ width: "150px" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3FF4D9E5-AFCA-4CCC-8D0B-84B0A7DFF038</td>
                <td>Prueba</td>
                <td>123</td>
                <td>
                  <button className="add" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck} /> Asignar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faCheck} /> Asignar
                  </button>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faCheck} /> Asignar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faCheck} /> Asignar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faCheck} /> Asignar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faCheck} /> Asignar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faCheck} /> Asignar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faCheck} /> Asignar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default RelacionarBienFactura;
