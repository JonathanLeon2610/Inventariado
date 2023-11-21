import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye,faSearch,faBroom} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function RelacionarBienFactura() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [id, setId] = useState([]);
  const [fecha, setFecha] = useState([]);
  const [cfdis, setCfdis] = useState([]);
  const [numInventario, setNumInventario] = useState([]);
  const [numInventarioInput, setNumInventarioInput] = useState("");

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
        setData(result);
        setOriginalData(result); // Almacena los datos originales
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
        `api/v1/cfdis/filtrar?Cfdi_Fecha=${fecha}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCfdis(result);
      })
      .catch((error) => console.log("error", error));
  }, [fecha]);

  const handleSubmit = (uuid, rfc) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var raw = JSON.stringify({
      Id: id,
      NumeroInventario: numInventario,
      UUID: uuid,
      EmisorRFC: rfc,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_REACT_APP_API_URL + `api/v1/ActivoBien/${id}/cfdi`, requestOptions)
      .then(() => {
        Swal.fire({
          title: "Asignacion realizada correctamente!",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });        
      })
      .catch((error) => console.log("error", error));
  };

  const buscarPorNumInventario = () => {
    const filteredData = data.filter(
      (item) =>
        item.numeroInventario.toLowerCase().includes(numInventarioInput.toLowerCase())
    );

    setData(filteredData);
  };

  const resetFilters = () => {
    setData(originalData); // Restaura los datos a su estado original
    setNumInventarioInput(""); // Limpia el campo de búsqueda
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
            value={numInventarioInput}
            onChange={(e) => setNumInventarioInput(e.target.value)}
          />
          <button
            className="add"
            onClick={() => {
              buscarPorNumInventario();
            }}
          >
            Buscar <FontAwesomeIcon icon={faSearch} />
          </button>
          {/* Nuevo botón para limpiar filtros */}
          <button className="add" style={{backgroundColor:"#154b96"}} onClick={resetFilters}>
            Limpiar Filtros <FontAwesomeIcon icon={faBroom} />
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
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.numeroInventario}</td>
                <td>{item.activoDescripcion}</td>
                <td>{item.modelo}</td>
                <td>${item.costo}</td>
                <td>
                  <button
                    onClick={() => {
                      setFecha(
                        new Date(item.cfdiDate).toISOString().split("T")[0]
                      );
                      setId(item.id);
                      setNumInventario(item.numeroInventario)
                      openModal();
                    }}
                    className="add"
                    style={{ backgroundColor: "orange" }}
                  >
                    <FontAwesomeIcon icon={faEye} /> Buscar factura
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
          <h2>Fecha de busqueda: {fecha}</h2>
          <h4>Tabla de facturas</h4>
          <table>
            <thead>
              <tr>
                <th>UUID</th>
                <th>Proveedor</th>
                <th style={{ width: "150px" }}>Folio</th>
                <th style={{ width: "150px" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cfdis) &&
                cfdis.map((item) => (
                  <>
                    <tr>
                      <td>{item.uuid}</td>
                      <td>{item.emisor_Nombre}</td>
                      <td>{item.comprobante_Folio}</td>
                      <td>
                        <button
                          className="add"
                          onClick={()=>Swal.fire({
                            title: "Estas seguro de realizar esta asignacion?",
                            showCancelButton: true,
                            confirmButtonText: "Confirmar",
                            denyButtonText: `No, cancelar`,
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                              handleSubmit(item.uuid,item.emisor_RFC)
                            } else if (result.isDenied) {
                              Swal.fire("No se ha hecho la asignacion", "", "info");
                            }
                          })}
                        >
                          <FontAwesomeIcon icon={faCheck} /> Asignar
                        </button>
                      </td>
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

export default RelacionarBienFactura;
