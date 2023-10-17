import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState} from "react";
import Swal from "sweetalert2";
function AgregarProveedor() {
  const [rfcError, setRfcError] = useState("");
  const rfcRegexFisica = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
  const regexRFCPersonaMoral = /^[A-Z]{3}[0-9]{6}[A-Z0-9]{3}$/;
  const [rfcRegex, setRfcRegex] = useState(rfcRegexFisica);

  const handlePersonaTipoChange = (e) => {
    const selectedPersonaTipo = parseInt(e.target.value);

    if (selectedPersonaTipo === 1) {
      setRfcRegex(rfcRegexFisica);
    } else if (selectedPersonaTipo === 2) {
      setRfcRegex(regexRFCPersonaMoral);
    }

    setInputValues({
      ...inputValues,
      personaTipoId: selectedPersonaTipo,
    });
  };

  const [inputValues, setInputValues] = useState({
    fechaNacimiento: "",
    nombre: "",
    nombreComercial: "",
    observaciones: "",
    personaTipoId: 1,
    rfc: "",
    saacgnetId: 0,
    tipoProveedorId: 4,
  });

  const handleEdit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    if (!rfcRegex.test(inputValues.rfc)) {
      setRfcError("El RFC no es válido");
      return;
    }

    var raw = JSON.stringify({
      fechaNacimiento: inputValues.fechaNacimiento,
      nombre: inputValues.nombre,
      nombreComercial: inputValues.nombreComercial,
      observaciones: inputValues.observaciones,
      personaTipoId: inputValues.personaTipoId,
      rfc: inputValues.rfc,
      saacgnetId: inputValues.saacgnetId,
      tipoProveedorId: inputValues.tipoProveedorId,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL + `api/v1/proveedores`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          // Manejar respuesta exitosa
          Swal.fire(
            "Registro exitoso!",
            "Se ha registrado correctamente el nuevo proveedor!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/main";
            }
          });
        } else {
          // Manejar errores HTTP
          if (response.status === 405) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Es posible que ese RFC ya este asignado a un proveedor',
            })
          } else {
            console.error("Error desconocido con código de estado:", response.status);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  return (
    <>
      <div>
        <h2 style={{ marginLeft: "1rem" }}>Datos Generales</h2>
        <hr />
        <button
              className="add"
              style={{ marginLeft: "1rem", backgroundColor: "gray" }}
              onClick={() => (window.location.href = "/main")}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Regresar
            </button>
        <form action="" onSubmit={handleEdit}>
          <div className="formulario-container-proveedor">
          <div>
              <label htmlFor="">RFC</label>
              <input
                type="text"
                placeholder="RFC"
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    rfc: e.target.value.toUpperCase(),
                  });
                  setRfcError("");
                }}
                required
              />
              {rfcError && <p style={{ color: "red" }}>{rfcError}</p>}
              <button>Consultar RFC</button>
            </div>
            <div>
              <label htmlFor="">Tipo de persona</label>
              <select onChange={handlePersonaTipoChange}>
                {inputValues.personaTipoId === 1 ? (
                  <>
                    <option value={1}>Fisica</option>
                    <option value={2}>Moral</option>
                  </>
                ) : (
                  <>
                    <option value={2}>Moral</option>
                    <option value={1}>Fisica</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="">Tipo de proveedor</label>
              <select
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    tipoProveedorId: parseInt(e.target.value),
                  })
                }
                required
              >
                {inputValues.tipoProveedorId === 4 ? (
                  <>
                    <option value={4}>Nacional</option>
                    <option value={5}>Extranjero</option>
                  </>
                ) : (
                  <>
                    <option value={4}>Extranjero</option>
                    <option value={5}>Nacional</option>
                  </>
                )}
              </select>
            </div>
            
            <div>
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    nombre: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="">Nombre Comercial</label>
              <input
                type="text"
                placeholder="Nombre Comercial"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    nombreComercial: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="">Observaciones</label>
              <input
                type="text"
                placeholder="Observaciones"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    observaciones: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="">Inicio de Operaciones</label>
              <input
                type="date"
                placeholder="Tipo de Persona"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    fechaNacimiento: e.target.value,
                  })
                }
                required
              />
            </div>

            <button type="submit">
              <FontAwesomeIcon icon={faCheck} /> Confirmar Cambios
            </button>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => (window.location.href = "/main")}
            >
              <FontAwesomeIcon icon={faBan} /> Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AgregarProveedor;
