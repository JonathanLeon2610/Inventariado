import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function DatosGenerales() {
  const [data, setData] = useState([]); // Estado local para la página actual
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];
  const [rfcError, setRfcError] = useState("");
  const rfcRegexFisica = /[A-Z,Ñ,&]{4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?/;
  const regexRFCPersonaMoral = /[A-Z,Ñ,&]{3}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?/;
  const [rfcRegex, setRfcRegex] = useState(rfcRegexFisica);

  const handlePersonaTipoChange = (e) => {
    const selectedPersonaTipo = parseInt(e.target.value);
  
    // Actualiza la expresión regular según el tipo de persona seleccionado
    if (selectedPersonaTipo === 1) {
      setRfcRegex(rfcRegexFisica);
    } else if (selectedPersonaTipo === 2) {
      setRfcRegex(regexRFCPersonaMoral);
    }
  
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      personaTipoId: selectedPersonaTipo,
    }));
  
    console.log(selectedPersonaTipo);
  };
  

  const [inputValues, setInputValues] = useState({
    id: "",
    contactos: "",
    email: "",
    fechaNacimiento: "",
    nombre: "",
    nombreComercial: "",
    observaciones: "",
    paginaWeb: "",
    personaTipoId: null,
    rfc: "",
    saacgnetId: "",
    telFijo: "",
    tipoProveedorId: "",
  });

  const handleEdit = () => {
    if (!rfcRegex.test(inputValues.rfc)) {
      setRfcError("El RFC no es válido");

      return;
    }
    const url = window.location.pathname;
    const segments = url.split("/");
    const ultimoValor = segments[segments.length - 1];
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json"); // Agrega el tipo de contenido JSON

    var raw = JSON.stringify({
      id: ultimoValor,
      contactos: inputValues.contactos,
      email: inputValues.email,
      fechaNacimiento: inputValues.fechaNacimiento,
      nombre: inputValues.nombre,
      nombreComercial: inputValues.nombreComercial,
      observaciones: inputValues.observaciones,
      paginaWeb: inputValues.paginaWeb,
      personaTipoId: inputValues.personaTipoId,
      rfc: inputValues.rfc,
      saacgnetId: inputValues.saacgnetId,
      telFijo: inputValues.telFijo,
      tipoProveedorId: inputValues.tipoProveedorId,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw, // Convierte el estado inputValues a JSON
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/proveedores/${ultimoValor}`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          Swal.fire(
            "Registro exitoso!",
            "Los cambios se han aplicado exitosamente!",
            "success"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
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
        `api/v1/proveedores/${ultimoValor}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setInputValues({
          id: ultimoValor,
          contactos: result.contactos,
          email: result.email,
          fechaNacimiento: result.fechaNacimiento,
          nombre: result.nombre,
          nombreComercial: result.nombreComercial,
          observaciones: result.observaciones,
          paginaWeb: result.paginaWeb,
          personaTipoId: result.personaTipoId,
          rfc: result.rfc,
          saacgnetId: result.saacgnetId,
          telFijo: result.telFijo,
          tipoProveedorId: result.tipoProveedorId,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h2 style={{ marginLeft: "1rem" }}>Datos Generales</h2>
        <hr />
        <div className="formulario-container-proveedor">
          <div>
            <label htmlFor="">Tipo de persona</label>
            <select onChange={handlePersonaTipoChange}>
              {data.personaTipoId === 1 ? (
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
            >
              {data.tipoProveedorId === 4 ? (
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
            <label htmlFor="">RFC</label>
            <input
              type="text"
              placeholder="RFC"
              defaultValue={data.rfc}
              onChange={(e) => {
                setInputValues({
                  ...inputValues,
                  rfc: e.target.value.toUpperCase(),
                });
                setRfcError("");
              }}
              minLength={data.personaTipoId === 1 ? (12) : (13)}
              required
            />
            {rfcError && <p style={{ color: "red" }}>{rfcError}</p>}
          </div>
          <div>
            <label htmlFor="">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              defaultValue={data.nombre}
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
              defaultValue={data.nombreComercial}
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
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Email"
              defaultValue={data.email}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  email: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="">Pagina Web</label>
            <input
              type="text"
              placeholder="Pagina Web"
              defaultValue={data.paginaWeb}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  paginaWeb: e.target.value,
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
              defaultValue={data.observaciones}
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
            <label htmlFor="">Telefono</label>
            <input
              type="number"
              placeholder="Telefono Fijo"
              defaultValue={data.telFijo}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  telFijo: e.target.value,
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
              defaultValue={
                data.fechaNacimiento ? data.fechaNacimiento.split("T")[0] : ""
              }
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  fechaNacimiento: e.target.value,
                })
              }
              required
            />
          </div>

          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faCheck} /> Confirmar Cambios
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
export default DatosGenerales;
