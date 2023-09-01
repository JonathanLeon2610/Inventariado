import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function EditBienInventariable() {
  const [inputValues, setInputValues] = useState({
    id: "",
    activoTipo: "",
    numeroInventario: "",
    activoDescripcion: "",
    MarcaId: "",
    modelo: "",
    numeroSerie: "",
    caracteristicas: "",
    comentarios: "",
    tipoAlta: "",
    costo: "",
    estatusBienId: "1",
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
      .then((response) => response.json())
      .then((result) => {
        setInputValues({
          id: ultimoValor,
          activoDescripcion: result.activoDescripcion,
          costo: result.costo,
          marcaId: result.marcaId,
          modelo: result.modelo,
        });
        setData(result);
        setSelectedMarca(result.marca);
        console.log(inputValues);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Tu sesión ha expirado",
          text: "Vuelve a iniciar sesión",
        }).then(() => {
          window.location.href = "/login";
        });
      });
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
      body: inputValues, // Convierte el estado inputValues a JSON
      redirect: "follow",
    };

    fetch(
      `https://192.168.10.100/api/v1/activobien/${ultimoValor}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // Realiza cualquier acción adicional necesaria después de la actualización
        console.log(result);
        console.log(inputValues);
      })
      .catch((error) => {
        console.log(error);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Tu sesion ha expirado',
        //   text: 'Vuelve a iniciar sesion',
        // })
        // .then(()=>{
        //   window.location.href = "/login"
        // })
      });
  };

  return (
    <>
      {data ? (
        <>
          <div>
            <h2 style={{ marginLeft: "1rem" }}>Editar Bien Inventariable</h2>
            <div className="formulario-container">
              <input
                type="text"
                placeholder="Tipo de Activo"
                defaultValue={data.activoTipo}
                onChange={(e) =>
                  setInputValues({ ...inputValues, activoTipo: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Numero de Inventario"
                defaultValue={data.numeroInventario}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    numeroInventario: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="activoDescripcion"
                defaultValue={data.activoDescripcion}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    activoDescripcion: e.target.value,
                  })
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
                  <option key={marca.id} value={marca.id}>
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
                placeholder="Caracteristicas (Opcional)"
                defaultValue={data.caracteristicas}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    caracteristicas: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Comentarios (Opcional)"
                defaultValue={data.comentarios}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    comentarios: e.target.value,
                  })
                }
              />

              <select
                onChange={(e) =>
                  setInputValues({ ...inputValues, TipoAlta: e.target.value })
                }
              >
                <option value={"compra"}>Compra</option>
                <option value={"Dato"}>Como Dato</option>
                <option value={"donacion"}>Donaciòn</option>
                <option value={"otro"}>Otro</option>
              </select>

              <input
                type="number"
                placeholder="Costo"
                defaultValue={data.costo}
                onChange={(e) =>
                  setInputValues({ ...inputValues, costo: e.target.value })
                }
              />
              {/* <input type="file" /> */}
              <button onClick={handleEdit}>Confirmar cambios</button>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => (window.location.href = "/main")}
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando</p>
      )}
    </>
  );
}

export default EditBienInventariable;
