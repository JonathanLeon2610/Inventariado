import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight,faSearch,faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Proveedores() {
  const [data, setdata] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;

  const [nombre, setNombre] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");

  useEffect(() => {
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +`api/v1/proveedores/filtrar?Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}&Nombre =${nombre}`,{
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setdata(result);
        console.log(result);
      })
      .catch(() => console.log("Error: CODIGO #1"));
  }, [currentPage]);
  return (
    <>
    <div>
      <h2>Tabla de Proveedores</h2>
      <div className="filter-form">
              <label>Nombre:</label>
              <input type="text" placeholder="Introducir Nombre" />
              <label>Nombre Comercial:</label>
              <input type="text" placeholder="Introducir Nombre Comercial" />
              <label>Email:</label>
              <input type="email" placeholder="Introducir Correo Electronico" />
              <label>RFC:</label>
              <input type="text" placeholder="Introducir RFC" />
              <button className="add">
                Buscar <FontAwesomeIcon icon={faSearch} />{" "}
              </button>
            </div>
      <table>
        <thead>
        <tr>
              <th colSpan="12">
                Lista de inventariables -- Pagina #{currentPage}
              </th>
            </tr>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Nombre Comercial</th>
            <th>Telefono</th>
            <th>Correo Electronico</th>
            <th>RFC</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index)=>(
           <>
            <tr key={index}>
            <td>{index+1}</td>
            <td>{item.nombre}</td>
            <td>{item.nombreComercial  || "N/A"}</td>
            <td>{item.telFijo || "N/A"}</td>
            <td>{item.nombreComercial  || "N/A"}</td>
            <td>{item.rfc}</td>
            <td>
              <Link to="/edit-proveedor">
                <button className="free"><FontAwesomeIcon icon={faArrowRight} /> Editar Proveedor</button>
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
