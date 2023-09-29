import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

function DatosRepresentante() {
  const [curp, setCurp] = useState("");
  const [curpError, setCurpError] = useState("");
  const url = window.location.pathname;
    const segments = url.split("/");
    const ultimoValor = segments[segments.length - 1];

  // Expresión regular para validar CURP en México
  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

  const handleCurpChange = (e) => {
    const inputValue = e.target.value.toUpperCase(); // Convertir a mayúsculas
    setCurp(inputValue);

    // Validar el CURP con la expresión regular
    if (!curpRegex.test(inputValue)) {
      setCurpError("El CURP no es válido");
    } else {
      setCurpError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si hay un error en el campo CURP
    if (!curpError) {
      // Realizar la acción de registro aquí
      console.log("CURP válido:", curp);
    } else {
      console.log("El formulario contiene errores.");
    }


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
        `api/v1/proveedores/${ultimoValor}/Representante`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>Datos del representante</h2>
      <hr />
      <div className="formulario-container-proveedor">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <label htmlFor="">Nombre:</label>
              <input type="text" placeholder="Nombre" required />
            </div>
            <div>
              <label htmlFor="">CURP:</label>
              <input
                type="text"
                placeholder="CURP"
                value={curp}
                onChange={handleCurpChange}
                required
              />
              {curpError && <p style={{ color: "red" }}>{curpError}</p>}
            </div>
            <div>
              <label htmlFor="">Telefono:</label>
              <input type="text" placeholder="Telefono" required />
            </div>
            <div>
              <label htmlFor="">Email:</label>
              <input type="text" placeholder="Email" required />
            </div>
            <div>
              <label htmlFor="">No. de acta constitutiva:</label>
              <input type="text" placeholder="No. de acta constitutiva" required />
            </div>
            <div>
              <label htmlFor="">No. Poder notarial:</label>
              <input type="text" placeholder="No. Poder notarial" required />
            </div>
            <div>
              <label htmlFor="">Datos de la notaria:</label>
              <input type="text" placeholder="Datos de la notaria" required />
            </div>
          </div>

          <button type="submit">
            <FontAwesomeIcon icon={faCheck} /> Registrar
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => (window.location.href = "/main")}
          >
            <FontAwesomeIcon icon={faBan} /> Cancelar
          </button>
        </form>
      </div>
    </>
  );
}

export default DatosRepresentante;
