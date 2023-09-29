import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
function DatosBancarios() {
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];

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
        console.log(result);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>Datos Bancarios</h2>
      <hr />
      <div className="formulario-container-proveedor">
        <form>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <label htmlFor="">Banco</label>
              <select name="" id="">
                <option value="4">Nacional</option>
                <option value="5">Extranjero</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Cuenta</label>
              <input type="text" placeholder="Tipo de Persona" required />
            </div>
            <div>
              <label htmlFor="">Sucursal</label>
              <input type="text" placeholder="Tipo de Persona" required />
            </div>
            <div>
              <label htmlFor="">CLABE(18 Digitos)</label>
              <input type="text" placeholder="Tipo de Persona" required minLength={18} maxLength={18}/>
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

export default DatosBancarios;
