import { useEffect, useState } from "react";

function EditBienInventariable() {
  const [inputValues, setInputValues] = useState({
    nombre: "",
    marca: "",
    modelo: "",
    costo: "",
  });

  const [data, setData] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(""); // Estado para la marca seleccionada

  useEffect(() => {
    const url = window.location.pathname;
    const segments = url.split("/");
    const ultimoValor = segments[segments.length - 1];

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
      `https://192.168.10.100/api/v1/activobien/${ultimoValor}`,
      requestOptions
    )
      .then((response) => response.json()) // Cambiar a response.json() para parsear JSON
      .then((result) => {
        setData(result);

        setSelectedMarca(result.marca); // Establecer la marca seleccionada
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    fetch("https://192.168.10.100/api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMarcas(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = () => {
    const url = window.location.pathname;
    const segments = url.split("/");
    const ultimoValor = segments[segments.length - 1];

    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json"); // Agrega el tipo de contenido JSON

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(inputValues), // Convierte el estado inputValues a JSON
      redirect: "follow",
    };

    console.log(inputValues);

    // fetch(
    //   `https://192.168.10.100/api/v1/activobien/${ultimoValor}`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // Realiza cualquier acción adicional necesaria después de la actualización
    //     console.log(result);
    //   })
    //   .catch((error) => console.log("error", error));
  };

  return (
    <>
      {data ? (
        <div>
          <h2 style={{ marginLeft: "1rem" }}>Editar Bien Inventariable</h2>
          <div className="formulario-container">
            <input
              type="text"
              placeholder="Nombre"
              defaultValue={data.activoDescripcion}
              onChange={(e) =>
                setInputValues({ ...inputValues, nombre: e.target.value })
              }
            />
            <select
              defaultValue={selectedMarca}
              onChange={(e) =>
                setInputValues({ ...inputValues, marca: e.target.value })
              }
            >
              <option value={selectedMarca}>{selectedMarca}</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={marca.name}>
                  {marca.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Modelo"
              defaultValue={data.modelo}
              onChange={(e) =>
                setInputValues({ ...inputValues, modelo: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Costo"
              defaultValue={data.costo}
              onChange={(e) =>
                setInputValues({ ...inputValues, costo: e.target.value })
              }
            />
            <button onClick={handleEdit}>Confirmar cambios</button>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => history.back()}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando</p>
      )}
    </>
  );
}

export default EditBienInventariable;
