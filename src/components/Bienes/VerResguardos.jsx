import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye,faSearch} from "@fortawesome/free-solid-svg-icons";

function VerResguardos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fecha, setFecha] = useState([]);
  const [searchName, setSearchName] = useState([]);
  const [nombrePersona, setNombrePersona] = useState("");
  const [personal, setPersonal] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSearchName("");
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
        `api/v1/ActivoBien/cfdipendientes`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPersonal(result);
        setPersonal(result); // Almacena los datos originales
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
        <h2>Ver resguardos del personal</h2>
        <div className="filter-form">
          <label>Buscar por nombre:</label>
          <input
            type="text"
            name="noInventario"
            placeholder="Introducir nombre de personal"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre de la persona</th>
              <th>Cargo o rol</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {personal.map((item) => (
              <tr key={item.id}>
                <td>{item.nombreComercial}</td>
                <td>{item.denominacionCargo}</td>
                <td>
                  <button
                    onClick={() => {
                        setNombrePersona(item.nombreComercial)
                        openModal();
                    }}
                    className="add"
                    style={{ backgroundColor: "orange" }}
                  >
                    <FontAwesomeIcon icon={faEye} /> Ver resguardos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <div style={backdropAnimationStyles}></div>}

      {isModalOpen && (
        <div className="modal" style={modalAnimationStyles}>
          <span className="close" onClick={closeModal}>
            <p>Cerrrar &times;</p>
          </span>
          <h2>Persona seleccionada: {nombrePersona}</h2>
          <div className="filter-form">
          <label>Buscar por fecha:</label>
          <input
            type="date"
            name="noInventario"
          />
          <button className="add">
            Buscar <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
          <table>
            <thead>
              <tr>
                <th>No. resguardo</th>
                <th>Fecha del reguardo</th>
                <th>Descripcion del bien resguardado</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(personal) &&
                personal.map((item) => (
                  <>
                    <tr>
                      <td>16135168-8</td>
                      <td>23/11/2023</td>
                      <td>Mouse logitech</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default VerResguardos;
