import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus,faEdit} from "@fortawesome/free-solid-svg-icons";

function Inventariables() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("https://192.168.10.100/api/v1/activobien/filtrar", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <>
      <div>
        <h2>Lista de Inventariables</h2>
        <Link to={"/agregar-bien-inventariable"}><button className="add"> <FontAwesomeIcon icon={faPlus}/> Agregar Bien</button></Link>
        <table>
          <thead>
            <tr>
              <th># Inventario</th>
              <th>Descripcion</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th># Serie</th>
              <th>Costo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <>
                <tr key={item.id}>
                  <td>{item.numeroInventario}</td>
                  <td>{item.activoDescripcion}</td>
                  <td>{item.marca}</td>
                  <td>{item.modelo}</td>
                  <td>{item.numeroSerie}</td>
                  <td>${(item.costo).toLocaleString("en")}</td>
                  <td><Link to={`/edit-bien-inventariable/${item.id}`}><button className="free"><FontAwesomeIcon icon={faEdit}/> Editar</button></Link></td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Inventariables;
