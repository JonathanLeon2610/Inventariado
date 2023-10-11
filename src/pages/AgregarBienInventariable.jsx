import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,

  faCheck,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

function AgregarBienInventariable() {
  const [data, setdata] = useState([]);
  const [inputValues, setInputValues] = useState({
    ActivoTipo: "",
    NumeroInventario: "",
    ActivoDescripcion: "",
    MarcaId: "4",
    Modelo: "",
    NumeroSerie: "",
    Costo: "",
    TipoAlta: "Compra",
    Comentarios: "",
    Caracteristicas: "",
  });





  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_API_URL+"api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch(() => console.log("error: CODIGO: 1"));
  }, []);

  const handleEdit = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json"); 

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(inputValues),
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_REACT_APP_API_URL+`api/v1/activobien`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        Swal.fire(
          "Registro exitoso!",
          "Se ha realizado su registro satisfactoriamente!",
          "success"
        ).then(() => {
          window.location.href = "/main";
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Hubo un error al crear el registro",
          text: "Por favor intente nuevamente",
        })
        console.log("Error: CODIGO #2");
      });
  };
  return (
    <>
      <div>
        <h2 style={{ marginLeft: "1rem" }}>Agregar Bien Inventariable</h2>
        <button
          className="add"
          style={{ marginLeft: "1rem", backgroundColor: "gray" }}
          onClick={() => (window.location.href = "/main")}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Regresar
        </button>
        <div className="formulario-container">
          <input
            type="text"
            placeholder="Tipo de Activo"
            onChange={(e) =>
              setInputValues({ ...inputValues, ActivoTipo: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="No. Inventario"
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                NumeroInventario: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Descripcion"
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                ActivoDescripcion: e.target.value,
              })
            }
            required
          />
          <select
            onChange={(e) =>
              setInputValues({ ...inputValues, MarcaId: e.target.value })
            }
          >
            {data.map((marca) => (
              <>
                <option
                  value={marca.id.toString()}
                  onClick={() =>
                    setInputValues({ ...inputValues, Marca: marca.name })
                  }
                >
                  {marca.name}
                </option>
              </>
            ))}
          </select>

          <input
            type="text"
            placeholder="Modelo"
            onChange={(e) =>
              setInputValues({ ...inputValues, Modelo: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="No. Serie"
            onChange={(e) =>
              setInputValues({ ...inputValues, NumeroSerie: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Caracteristicas (Opcional)"
            defaultValue={data.caracteristicas}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                Caracteristicas: e.target.value,
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
          <input
            type="numer"
            pattern="[0-9]*"
            placeholder="Costo"
            onChange={(e) =>
              setInputValues({ ...inputValues, Costo: e.target.value })
            }
            required
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
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faCheck} /> Registrar
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => (window.location.href = "/main")}
          >
            <FontAwesomeIcon icon={faBan} /> Cancelar
          </button>

        </div>
      </div>
    </>
  );
}

export default AgregarBienInventariable;
