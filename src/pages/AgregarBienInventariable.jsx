import { useEffect, useState } from "react";

function AgregarBienInventariable() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("https://192.168.10.100/api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div>
        <h2 style={{ marginLeft: "1rem" }}>Agregar Bien Inventariable</h2>
        <div className="formulario-container">
          <input
            type="text"
            placeholder="No. Inventario"
          />
          <input type="text" placeholder="Descripcion" />
          <select>
            {data.map((marca) =>(
                <>
                <option value={marca.id}>{marca.name}</option>
                </>
            ))}
          </select>
          
          <input type="text" placeholder="Modelo" />
          <input type="text" placeholder="No. Serie" />
          <input type="numer" pattern="[0-9]*" placeholder="Costo" />
          <select>
            <option value={"compra"}>Compra</option>
            <option value={"Dato"}>Como Dato</option>
            <option value={"donacion"}>Donaciòn</option>
            <option value={"otro"}>Otro</option>
          </select>
          <button type="submit">Agregar Bien</button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => history.back()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}

export default AgregarBienInventariable;
