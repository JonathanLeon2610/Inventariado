import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan, faDownload } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function DatosRepresentante() {
  // eslint-disable-next-line no-unused-vars
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
    datosNotaria: "",
  });

  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

  const handleCurpChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    setCurp(inputValue);

    if (!curpRegex.test(inputValue)) {
      setCurpError("El CURP no es válido");
    } else {
      setCurpError("");
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
        setData(result);
        setInputValues({
          id: ultimoValor,
          representanteLegal: result.representanteLegal || "",
          repCURP: result.repCURP || "",
          repTel: result.repTel || "",
          repEmail: result.repEmail || "",
          actaConstitutiva: result.actaConstitutiva || "",
          poderNotarial: result.poderNotarial || "",
          datosNotaria: result.datosNotaria || "",
        });
      })
      .catch((error) => console.log(error));
  }, []);

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
      `api/v1/SoftwareContable/proveedor/${ultimoValor}/Representante`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setInputValues({
          id: ultimoValor,
          representanteLegal: result.representanteLegal || "",
          repCURP: result.repCURP || "",
          repTel: result.repTel || "",
          repEmail: result.repEmail || "",
          actaConstitutiva: result.actaConstitutiva || "",
          poderNotarial: result.poderNotarial || "",
          datosNotaria: result.datosNotaria || "",
        });

        document.getElementById("nombre").value = result.representanteLegal || "";
        document.getElementById("curp").value =
          result.repCURP || "";
        document.getElementById("telefono").value =
          result.repTel || "";
        document.getElementById("email").value =
          result.repEmail || "";
        document.getElementById("actaConstitutiva").value = result.actaConstitutiva || "";
        document.getElementById("poderNotarial").value = result.poderNotarial || "";
        document.getElementById("datosNotaria").value =
          result.datosNotaria || "";
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se encontraron datos relacionados con este proveedor',
        })
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (curpError) {
      return; // No permitir el envío si hay un error en el CURP
    }

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
      datosNotaria: inputValues.datosNotaria,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/proveedores/${ultimoValor}/Representante`,
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
  };

  return (
    <>
      <h2>Datos del representante</h2>
      <hr />
      <button className="add" onClick={handleconsult}>
        <FontAwesomeIcon icon={faDownload}/> Importar datos
      </button>
      <div className="formulario-container-proveedor">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <label htmlFor="">Nombre:</label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                required
                defaultValue={data.representanteLegal}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    representanteLegal: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">CURP:</label>
              <input
                id="curp"
                type="text"
                placeholder="CURP"
                defaultValue={data.repCURP}
                onChange={(e) => {
                  handleCurpChange(e);
                  setInputValues({
                    ...inputValues,
                    repCURP: e.target.value.toUpperCase(),
                  });
                }}
              />
              {curpError && <p style={{ color: "red" }}>{curpError}</p>}
            </div>
            <div>
              <label htmlFor="">Telefono:</label>
              <input
                id="telefono"
                type="text"
                placeholder="Telefono"
                required
                defaultValue={data.repTel}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    repTel: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                defaultValue={data.repEmail}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    repEmail: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">No. de acta constitutiva:</label>
              <input
                id="actaConstitutiva"
                type="text"
                placeholder="No. de acta constitutiva"

                defaultValue={data.actaConstitutiva}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    actaConstitutiva: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">No. Poder notarial:</label>
              <input
                id="poderNotarial"
                type="text"
                placeholder="No. Poder notarial"

                defaultValue={data.poderNotarial}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    poderNotarial: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Datos de la notaria:</label>
              <input
                id="datosNotaria"
                type="text"
                placeholder="Datos de la notaria"

                defaultValue={data.datosNotaria}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    datosNotaria: e.target.value,
                  });
                }}
              />
            </div>
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
        </form>
      </div>
    </>
  );
}

export default DatosRepresentante;
