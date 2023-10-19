import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faBan,
  faEye,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function RequisicionDeBien() {
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

  return (
    <>
      <div>
        <h2>Requisicion de materiales</h2>
        <div className="filter-form">
          <label>Añadir por No. Inventario:</label>
          <input
            type="text"
            name="noInventario"
            placeholder="Introducir No.Inventario"
          />
          <button className="add">
            Agregar <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            onClick={openModal}
            className="add"
            style={{ backgroundColor: "orange" }}
          >
            <FontAwesomeIcon icon={faEye} /> Catalogo de materiales
          </button>
          <button className="add" style={{ backgroundColor: "#0056b3" }}>
            Realizar solicitud <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: "150px" }}>Cantidad</th>
              <th style={{ width: "150px" }}>Unidad</th>
              <th>Descripción</th>
              <th style={{ width: "150px" }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>PZA</td>
              <td>Prueba</td>
              <td>
                <button className="free" style={{ backgroundColor: "red" }}>
                  <FontAwesomeIcon icon={faBan} /> Quitar de la lista
                </button>
              </td>
            </tr>
            <tr>
              <td>Computadora 2</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>
                <button className="set" style={{ backgroundColor: "red" }}>
                  <FontAwesomeIcon icon={faBan} /> Quitar de la lista
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
          <div className="filter-form">
            <label>Nombre:</label>
            <input
              type="text"
              name="noInventario"
              placeholder="Nombre del material"
            />
            <label>Grupo:</label>
            <select name="marcaId">
              <option value="none">Selecciona una grupo</option>
              <option value="none">Selecciona una grupo</option>
              <option value="none">Selecciona una grupo</option>
              <option value="none">Selecciona una grupo</option>
            </select>
            <button className="add" style={{ backgroundColor: "#0056b3" }}>
                <FontAwesomeIcon icon={faSearch} /> Buscar 
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "150px" }}>Nombre</th>
                <th style={{ width: "150px" }}>Codigo</th>
                <th>Descripción</th>
                <th style={{ width: "150px" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faPlus} /> Agregar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faPlus} /> Agregar
                  </button>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faPlus} /> Agregar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faPlus} /> Agregar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faPlus} /> Agregar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faPlus} /> Agregar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faPlus} /> Agregar
                  </button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>PZA</td>
                <td>Prueba</td>
                <td>
                  <button className="add">
                    <FontAwesomeIcon icon={faPlus} /> Agregar
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

export default RequisicionDeBien;
