import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AsignacionResguardos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personal, setPersonal] = useState([]);
  const [searchName, setSearchName] = useState([]);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSearchName("");
    setIsModalOpen(false);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  // Modal CSS (Estilos de ejemplo)
  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Ajuste importante para centrar
    transition: "transform 0.5s",
    backgroundColor: "white",
    padding: "20px",
    width: "90%",
    height: "40rem",
    overflowY: "auto",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  };

  // Fondo oscuro CSS (Estilos de ejemplo)
  const backdropStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 1.0s",
    zIndex: 0,
  };

  // Cambia los estilos del modal y del fondo oscuro al abrir o cerrar
  const modalAnimationStyles = (isOpen) => ({
    ...modalStyles,
    transform: isOpen ? "translate(-50%, -50%)" : "translate(-50%, 50%)",
  });

  const backdropAnimationStyles = (isOpen) => ({
    ...backdropStyles,
    backgroundColor: isOpen ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
  });

  useEffect(() => {
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
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/personacolaboradores/filtrar?Nombre=`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPersonal(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
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
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/personacolaboradores/filtrar?Nombre=${searchName}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        setPersonal(result);
      })
      .catch((error) => console.log("error", error));
  }, [searchName]);

  return (
    <>
      <div>
        <h2>Asignacion de Resguardos</h2>
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
              <th>No. Inventario</th>
              <th>Articulo</th>
              <th>Asignado a</th>
              <th>Fecha de asignacion</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>65981-6</td>
              <td>Computadora 2</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>
                <button
                  onClick={() => {
                    openModal();
                  }}
                  className="add"
                >
                  <FontAwesomeIcon icon={faEye} /> Asignar resguardo
                </button>
              </td>
            </tr>
            <tr>
              <td>65981-6</td>
              <td>Computadora 2</td>
              <td>Pedro Lopez</td>
              <td>23/11/2023</td>
              <td>
                <button
                  onClick={() => {
                    openSecondModal();
                  }}
                  className="add"
                  style={{ backgroundColor: "orange" }}
                >
                  <FontAwesomeIcon icon={faEye} /> Cancelar resguardo
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Fondo oscuro */}
      {isModalOpen && <div style={backdropAnimationStyles(true)}></div>}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" style={modalAnimationStyles(isModalOpen)}>
          <span className="close" onClick={closeModal}>
            <p>Cerrrar &times;</p>
          </span>
          <h2>Personal disponible</h2>
          <div className="filter-form">
            <label>Buscar por nombre:</label>
            <input
              type="text"
              name="noInventario"
              placeholder="Introducir nombre"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cargo o rol</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <>
                {Array.isArray(personal) &&
                  personal.map((item) => (
                    <>
                      <tr>
                        <td>{item.nombreComercial}</td>
                        <td>{item.denominacionCargo}</td>
                        <td>
                          <button
                            className="add"
                            onClick={() =>
                              Swal.fire({
                                title:
                                  "Estas seguro de realizar esta asignacion?",
                                showCancelButton: true,
                                confirmButtonText: "Confirmar",
                                denyButtonText: `No, cancelar`,
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                  handleSubmit(item.uuid, item.emisor_RFC);
                                } else if (result.isDenied) {
                                  Swal.fire(
                                    "No se ha hecho la asignacion",
                                    "",
                                    "info"
                                  );
                                }
                              })
                            }
                          >
                            <FontAwesomeIcon icon={faCheck} /> Asignar
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
              </>
            </tbody>
          </table>
        </div>
      )}

      {isSecondModalOpen && (
        <div style={backdropAnimationStyles(isSecondModalOpen)}></div>
      )}

      {isSecondModalOpen && (
          <div className="modal" style={modalAnimationStyles(isSecondModalOpen)}>
          <span className="close" onClick={closeSecondModal}>
            <p>Cerrar &times;</p>
          </span>
          <h2>Cancelacion de resguardo</h2>
          <div className="formulario-container">
            <div >
              <label htmlFor="">Fecha de la cancelacion</label>
              <input type="date" />
            </div>
            <div>
              <label htmlFor="">Motivos de la cancelacion</label>
              <select name="" id="">
                <option value="">Opcion 1</option>
                <option value="">Opcion 1</option>
                <option value="">Opcion 1</option>

                <option value="">Opcion 1</option>
              </select>
            </div>
            <div  style={{display:"flex", alignItems:"center"}}>
              <label htmlFor="">Comentarios de la cancelacion</label>
              <textarea  style={{ marginLeft:"1rem", paddingTop:"1rem" }}/>
            </div>
            <div >
              <label htmlFor="">Persona que recibe el bien</label>
              <select name="" id="">
              <>
                {Array.isArray(personal) &&
                  personal.map((item) => (
                    <>
                      <option value="">{item.nombreComercial}</option>
                    </>
                  ))}
              </>
              </select>
            </div>
            <button className="">Confirmar cancelacion</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AsignacionResguardos;
