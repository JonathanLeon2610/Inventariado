import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";
function AgregarProveedor() {
  const [rfcError, setRfcError] = useState("");
  const rfcRegexFisica =
    /[A-Z,Ñ,&]{4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?/;
  const regexRFCPersonaMoral =
    /[A-Z,Ñ,&]{3}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?/;
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

    console.log(inputValues);
  };

  const handlePersonaTipoChange2 = (id) => {
    if (id === 1) {
      setRfcRegex(rfcRegexFisica);
    } else if (id === 2) {
      setRfcRegex(regexRFCPersonaMoral);
    }

    setInputValues({
      ...inputValues,
      personaTipoId: id,
    });
  };

  const [inputValues, setInputValues] = useState({
    fechaNacimiento: "",
    nombre: "",
    nombreComercial: "",
    observaciones: "",
    personaTipoId: "",
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

    if (inputValues.personaTipoId === 0) {
      alert("No se ha seleccionado un tipo de persona");
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
              icon: "error",
              title: "Oops...",
              text: "Es posible que ese RFC ya este asignado a un proveedor",
            });
          } else {
            console.error(
              "Error desconocido con código de estado:",
              response.status
            );
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleconsult = () => {
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
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/SoftwareContable/proveedor/${inputValues.rfc}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const fechaNacimiento = new Date(result.fechaNacimiento);
        const fechaFormateada = fechaNacimiento.toISOString().split("T")[0];
        handlePersonaTipoChange2(result.personaTipoId);

        setInputValues({
          fechaNacimiento: fechaFormateada,
          nombre: result.nombre,
          nombreComercial: result.nombreComercial,
          observaciones: result.observaciones,
          rfc: result.rfc,
          saacgnetId: result.saacgnetId,
          personaTipoId: result.personaTipoId,
          tipoProveedorId: result.tipoProveedorId,
        });

        // Actualizar los campos del formulario
        document.getElementById("fechaNacimiento").value =
          fechaFormateada || "";
        document.getElementById("nombre").value = result.nombre || "";
        document.getElementById("nombreComercial").value =
          result.nombreComercial || "";
        document.getElementById("observaciones").value =
          result.observaciones || "";
        document.getElementById("personaTipoId").value =
          result.personaTipoId || "";
        document.getElementById("rfc").value = result.rfc || "";
        document.getElementById("saacgnetId").value = result.saacgnetId || "";
        document.getElementById("tipoProveedorId").value =
          result.tipoProveedorId || "";
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se encontraron datos de un proveedor con ese rfc",
        });
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
                id="rfc"
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
              <button type="button" onClick={handleconsult}>
                Importar proveedor con ese RFC
              </button>
            </div>
            <div>
              <label htmlFor="">Tipo de persona</label>
              <select onChange={handlePersonaTipoChange} id="personaTipoId">
                {inputValues.personaTipoId === 1 ? (
                  <>
                    <option value={1}>Física</option>
                    <option value={2}>Moral</option>
                  </>
                ) : (
                  <>
                    <option value={1}>Física</option>
                    <option value={2}>Moral</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="">Tipo de proveedor</label>
              <select
                id="tipoProveedorId"
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
              <label htmlFor="">saacgnetId</label>
              <input
                id="saacgnetId"
                type="text"
                placeholder="Nombre"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    saacgnetId: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="">Nombre</label>
              <input
                id="nombre"
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
                id="nombreComercial"
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
                id="observaciones"
                type="text"
                placeholder="Observaciones"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    observaciones: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="">Inicio de Operaciones</label>
              <input
                id="fechaNacimiento"
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
