import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSearch,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Proveedores() {
  const [data, setdata] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const [nombre, setNombre] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [email, setEmail] = useState("");
  const [RFC, setRFC] = useState("");

  const handleChangeData = (nombre, nombreComercial, email, RFC) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    setCurrentPage(1);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/proveedores/filtrar?Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}&Nombre=${nombre}&Email=${email}&NombreComercial=${nombreComercial}&RFC=${RFC}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setdata(result);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nombre":
        setNombre(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "nombreComercial":
        setNombreComercial(value);
        break;
      case "RFC":
        setRFC(value);
        break;
    }
  };

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
        `api/v1/proveedores/filtrar?Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}&Nombre=${nombre}&Email=${email}&NombreComercial=${nombreComercial}&RFC=${RFC}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setdata(result);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);
  return (
    <>
      <div>
        <h2>Tabla de Proveedores</h2>
        <Link to={"/agregar-proveedor"}>
                <button className="add">
                  <FontAwesomeIcon icon={faPlus} /> Agregar proveedor
                </button>
              </Link>
        <div className="filter-form">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Introducir Nombre"
            name="nombre"
            onChange={handleChange}
          />
          <label>Nombre Comercial:</label>
          <input
            type="text"
            placeholder="Introducir Nombre Comercial"
            name="nombreComercial"
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            placeholder="Introducir Correo Electronico"
            name="email"
            onChange={handleChange}
          />
          <label>RFC:</label>
          <input
            type="text"
            placeholder="Introducir RFC"
            name="RFC"
            onChange={handleChange}
          />
          <button
            className="add"
            onClick={() =>
              handleChangeData(nombre, nombreComercial, email, RFC)
            }
          >
            Buscar <FontAwesomeIcon icon={faSearch} />{" "}
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th colSpan="12">
                Lista de proveedores -- Pagina #{currentPage}
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Nombre Comercial</th>
              <th>Telefono</th>
              <th>Correo Electronico</th>
              <th>RFC</th>
              <th className="no-print">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>{item.nombreComercial || "N/A"}</td>
                  <td>{item.telFijo || "N/A"}</td>
                  <td>{item.email || "N/A"}</td>
                  <td>{item.rfc}</td>
                  <td className="no-print">
                    <Link to={`/edit-proveedor/${item.id}`}>
                      <button className="free">
                        <FontAwesomeIcon icon={faArrowRight} /> Editar Proveedor
                      </button>
                    </Link>
                    <Link to={`/facturasProveedor/${item.rfc}`}>
                      <button className="add">
                        <FontAwesomeIcon icon={faArrowRight} /> Ver Facturas
                      </button>
                    </Link>
                    <Link to={`/documentacion-proveedor/${item.id}`}>
                      <button className="add" style={{backgroundColor:"orange"}}>
                        <FontAwesomeIcon icon={faArrowRight} /> Ver documentos
                      </button>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {currentPage > 1 && (
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Anterior
            </button>
          )}
          {data.length === recordsPerPage && (
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Siguiente <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Proveedores;
