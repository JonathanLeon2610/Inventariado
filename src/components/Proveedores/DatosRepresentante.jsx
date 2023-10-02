import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function DatosRepresentante() {
  const [curp, setCurp] = useState("");
  const [curpError, setCurpError] = useState("");
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];
  const [data, setData] = useState("");

  const [inputValues, setInputValues] = useState({
      id: "",
      representanteLegal: "",
      repCURP: "",
      repTel: "",
      repEmail: "",
      actaConstitutiva: "",
      poderNotarial: "",
      datosNotaria: ""
  });

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
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );

      var raw = JSON.stringify({
        id: ultimoValor,
        representanteLegal: inputValues.representanteLegal,
        repCURP: inputValues.repCURP,
        repTel: inputValues.repTel,
        repEmail: inputValues.repEmail,
        actaConstitutiva: inputValues.actaConstitutiva,
        poderNotarial: inputValues.poderNotarial,
        datosNotaria: inputValues.datosNotaria
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      console.log(raw);

      fetch(
        `https://192.168.10.100/api/v1/proveedores/${ultimoValor}/Representante`,
        requestOptions
      )
        .then((response) => response.text())
        .then(() => {
          Swal.fire(
            "Registro exitoso!",
            "Los cambios se han aplicado exitosamente!",
            "success"
          );
        })
        .catch((error) => console.log("error", error));
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
        setData(result);
        setInputValues({
          id: ultimoValor,
          representanteLegal: result.representanteLegal,
          repCURP: result.repCURP,
          repTel: result.repTel,
          repEmail: result.repEmail,
          actaConstitutiva: result.actaConstitutiva,
          poderNotarial: result.poderNotarial,
          datosNotaria: result.datosNotaria
        });
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
              <input
                type="text"
                placeholder="Nombre"
                required
                defaultValue={data.representanteLegal}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    representanteLegal: e.target.value, // Convertir a mayúsculas
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">CURP:</label>
              <input
                type="text"
                placeholder="CURP"
                defaultValue={data.repCURP}
                onChange={(e) => {
                  handleCurpChange,
                  setInputValues({
                    ...inputValues,
                    repCURP: e.target.value.toUpperCase(), // Convertir a mayúsculas
                  });
                }}

              />
              {curpError && <p style={{ color: "red" }}>{curpError}</p>}
            </div>
            <div>
              <label htmlFor="">Telefono:</label>
              <input
                type="text"
                placeholder="Telefono"
                required
                defaultValue={data.repTel}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    repTel: e.target.value, // Convertir a mayúsculas
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Email:</label>
              <input
                type="text"
                placeholder="Email"
                required
                defaultValue={data.repEmail}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    repEmail: e.target.value, // Convertir a mayúsculas
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">No. de acta constitutiva:</label>
              <input
                type="text"
                placeholder="No. de acta constitutiva"
                required
                defaultValue={data.actaConstitutiva}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    actaConstitutiva: e.target.value, // Convertir a mayúsculas
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">No. Poder notarial:</label>
              <input
                type="text"
                placeholder="No. Poder notarial"
                required
                defaultValue={data.poderNotarial}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    poderNotarial: e.target.value, // Convertir a mayúsculas
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Datos de la notaria:</label>
              <input
                type="text"
                placeholder="Datos de la notaria"
                required
                defaultValue={data.datosNotaria}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    datosNotaria: e.target.value, // Convertir a mayúsculas
                  });
                }}
              />
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
