import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faArrowRight,
  faArrowLeft,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function Inventariables() {
  const [data, setdata] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const [marcas, setMarcas] = useState([]);
  const [noSerie, setNoSerie] = useState([]);
  const [noInventario, setNoInventario] = useState([]);
  const [marcaId, setMaraId] = useState(0);

  useEffect(() => {
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/activobien/filtrar?Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}&NumeroInventario${noInventario}&NumeroSerie=${noSerie}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch(() => console.log("Error: CODIGO #1"));
  }, [currentPage]);

  function getMarcaNameById(marcaId) {
    const marca = marcas.find((marca) => marca.id === marcaId);
    return marca ? marca.name : "Desconocida";
  }

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_API_URL + "api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setMarcas(result);
      })
      .catch(() => console.log("Error: CODIGO #2"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "noInventario":
        setNoInventario(value);
        break;
      case "marcaId":
        setMaraId(value);
        break;
      case "noSerie":
        setNoSerie(value);
        break;
      }
  };

  const handleChangeData = (noInventario, marcaId, noSerie) => {
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

    setCurrentPage(1);


    fetch(
      import.meta.env.VITE_REACT_APP_API_URL + `api/v1/activobien/filtrar?Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}&NumeroInventario=${noInventario}&NumeroSerie=${noSerie}&MarcaId=${marcaId}`,
      requestOptions
    )
    
      .then((response) => response.json())
      .then((result) => {
        setdata(result);
      })
      .catch(() => console.log('Error: CODIGO #4'));
  };

  return (
    <>
      <div className="no-print">
        <h2>Lista de Inventariables</h2>

        <div className="filter-form">
          <label>No. Inventario:</label>
          <input
            type="text"
            name="noInventario"
            placeholder="Introducir No.Inventario"
            onChange={handleChange}
          />
          <label>Marca:</label>
          <select name="marcaId" onChange={handleChange}>
            <option value="none" disabled selected>
              Selecciona una marca
            </option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id.toString()}>
                {marca.name}
              </option>
            ))}
          </select>
          <label>No.Serie</label>
          <input type="text" name="noSerie" placeholder="Introducir No.Serie" onChange={handleChange}/>
          <button className="add" onClick={() => handleChangeData(noInventario, marcaId, noSerie)}>
            Buscar <FontAwesomeIcon icon={faSearch} />{" "}
          </button>
        </div>
        <table className="table-to-print">
          <thead>
            <tr>
              <th colSpan="12">
                Lista de inventariables -- Pagina # {currentPage}
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th># Inventario</th>
              <th>Descripcion</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th># Serie</th>
              <th>Costo</th>
              <th className="option-button">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.numeroInventario}</td>
                <td>{item.activoDescripcion}</td>
                <td>{getMarcaNameById(item.marcaId)}</td>
                <td>{item.modelo}</td>
                <td>{item.numeroSerie}</td>
                <td>${item.costo.toLocaleString("en")}</td>
                <td className="option-button">
                  <Link to={`/edit-bien-inventariable/${item.id}`}>
                    <button className="free">
                      <FontAwesomeIcon icon={faEdit} /> Editar
                    </button>
                  </Link>
                </td>
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
