import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function Inventariables() {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    fetch(
      `https://192.168.10.100/api/v1/activobien/filtrar?Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  function allowAddButton() {
    if (localStorage.getItem("role") === "Auxiliar Administrativo") {
      return true;
    } else {
      return null;
    }
  }

  function getMarcaNameById(marcaId) {
    const marca = marcas.find((marca) => marca.id === marcaId);
    return marca ? marca.name : "Desconocida";
  }

  useEffect(() => {
    fetch("https://192.168.10.100/api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setMarcas(result);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h2>Lista de Inventariables</h2>
        {allowAddButton() ? (
          <Link to={"/agregar-bien-inventariable"}>
            <button className="add">
              {" "}
              <FontAwesomeIcon icon={faPlus} /> Agregar Bien
            </button>
          </Link>
        ) : (
          ""
        )}
        <table>
          <thead>
            <tr>
              <th># Inventario</th>
              <th>Descripcion</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th># Serie</th>
              <th>Costo</th>
              {allowAddButton() ? <th>Opciones</th> : ""}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.numeroInventario}</td>
                <td>{item.activoDescripcion}</td>
                <td>{getMarcaNameById(item.marcaId)}</td>
                <td>{item.modelo}</td>
                <td>{item.numeroSerie}</td>
                <td>${item.costo.toLocaleString("en")}</td>
                {allowAddButton() ? (
                  <td>
                    <Link to={`/edit-bien-inventariable/${item.id}`}>
                      <button className="free">
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </button>
                    </Link>
                  </td>
                ) : (
                  ""
                )}
              </tr>
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

export default Inventariables;
