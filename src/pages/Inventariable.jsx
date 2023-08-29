import { useEffect } from "react";

function Inventariables() {



  useEffect(() => {
    const apiUrl = 'https://192.168.10.100/api/v1/salas/vlist';
    fetch(apiUrl,{
      credentials:"include"
    })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
            console.log("Error al entrar");
        });
}, []);

    return (
      <div>
        <h2>Lista de Inventariables</h2>
        <table>
          <thead>
            <tr>
              <th># Inventario</th>
              <th>Descripcion</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th># Serie</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Producto A</td>
              <td>10</td>
              <td>$20.00</td>
              <td>$20.00</td>
              <td>$20.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Inventariables;
  