import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
function DatosBancarios() {
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];
  const [data, setData] = useState("");
  const [inputValues, setInputValues] = useState({
    id: ultimoValor,
    banco: "",
    bancoCuenta: "",
    bancoSucursal: "",
    bancoClabe: "",
  });

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
        `api/v1/proveedores/${ultimoValor}/DatosBancarios`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setInputValues({
          id: ultimoValor,
          banco: result.banco,
          bancoCuenta: result.bancoCuenta,
          bancoSucursal: result.bancoSucursal,
          bancoClabe: result.bancoClabe
        });
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

    var raw = JSON.stringify({
      id: ultimoValor,
      banco: inputValues.banco,
      bancoCuenta: inputValues.bancoCuenta,
      bancoSucursal: inputValues.bancoSucursal,
      bancoClabe: inputValues.bancoClabe,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw, // Convierte el estado inputValues a JSON
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/proveedores/${ultimoValor}/datosBancarios`,
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

  return (
    <>
      <h2>Datos Bancarios</h2>
      <hr />
      <div className="formulario-container-proveedor">

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <label htmlFor="">Banco</label>
              <select name="" id="" onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    banco: parseInt(e.target.value),
                  });
                }}>
                {data.banco === "4" ? (
                <>
                  <option value={4}>Nacional</option>
                  <option value={5}>Extranjero</option>
                </>
              ) : (
                <>
                  <option value={5}>Extranjero</option>
                  <option value={4}>Nacional</option>
                </>
              )}
              </select>
            </div>
            <div>
              <label htmlFor="">Cuenta</label>
              <input
                type="text"
                placeholder="Numero de cuenta"
                required
                defaultValue={data.bancoCuenta}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    bancoCuenta: e.target.value, // Convertir a mayúsculas
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Sucursal</label>
              <input type="text" placeholder="Direccion de la sucursal" required 
              defaultValue={data.bancoSucursal}
              onChange={(e) => {
                setInputValues({
                  ...inputValues,
                  bancoSucursal: e.target.value, // Convertir a mayúsculas
                });
              }}
            />
            </div>
            <div>
              <label htmlFor="">CLABE(18 Digitos)</label>
              <input
                type="text"
                placeholder="CLABE interancaria"
                required
                minLength={18}
                maxLength={18}
                defaultValue={data.bancoClabe}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    bancoClabe: e.target.value, // Convertir a mayúsculas
                  });
                }}
              />
            </div>
          </div>
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
    </>
  );
}

export default DatosBancarios;
