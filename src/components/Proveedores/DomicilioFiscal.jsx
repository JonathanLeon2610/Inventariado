import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function DomicilioFiscal() {
  const [data, setData] = useState([]);
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];

  const estados = [
    { EstadoId: "01", Nombre: "AGUASCALIENTES" },
    { EstadoId: "02", Nombre: "BAJA CALIFORNIA" },
    { EstadoId: "03", Nombre: "BAJA CALIFORNIA SUR" },
    { EstadoId: "04", Nombre: "CAMPECHE" },
    { EstadoId: "05", Nombre: "COAHUILA DE ZARAGOZA" },
    { EstadoId: "06", Nombre: "COLIMA" },
    { EstadoId: "07", Nombre: "CHIAPAS" },
    { EstadoId: "08", Nombre: "CHIHUAHUA" },
    { EstadoId: "09", Nombre: "CIUDAD DE MEXICO" },
    { EstadoId: "10", Nombre: "DURANGO" },
    { EstadoId: "11", Nombre: "GUANAJUATO" },
    { EstadoId: "12", Nombre: "GUERRERO" },
    { EstadoId: "13", Nombre: "HIDALGO" },
    { EstadoId: "14", Nombre: "JALISCO" },
    { EstadoId: "15", Nombre: "MEXICO" },
    { EstadoId: "16", Nombre: "MICHOACAN DE OCAMPO" },
    { EstadoId: "17", Nombre: "MORELOS" },
    { EstadoId: "18", Nombre: "NAYARIT" },
    { EstadoId: "19", Nombre: "NUEVO LEON" },
    { EstadoId: "20", Nombre: "OAXACA" },
    { EstadoId: "21", Nombre: "PUEBLA" },
    { EstadoId: "22", Nombre: "QUERETARO" },
    { EstadoId: "23", Nombre: "QUINTANA ROO" },
    { EstadoId: "24", Nombre: "SAN LUIS POTOSI" },
    { EstadoId: "25", Nombre: "SINALOA" },
    { EstadoId: "26", Nombre: "SONORA" },
    { EstadoId: "27", Nombre: "TABASCO" },
    { EstadoId: "28", Nombre: "TAMAULIPAS" },
    { EstadoId: "29", Nombre: "TLAXCALA" },
    { EstadoId: "30", Nombre: "VERACRUZ DE IGNACIO DE LA LLAVE" },
    { EstadoId: "31", Nombre: "YUCATAN" },
    { EstadoId: "32", Nombre: "ZACATECAS" },
  ];

  const paises = [
    { PaisId: "AR", Nombre: "Argentina" },
    { PaisId: "BR", Nombre: "Brasil" },
    { PaisId: "CA", Nombre: "Canadá" },
    { PaisId: "CL", Nombre: "Chile" },
    { PaisId: "CN", Nombre: "China" },
    { PaisId: "CO", Nombre: "Colombia" },
    { PaisId: "CR", Nombre: "Costa Rica" },
    { PaisId: "EC", Nombre: "Ecuador" },
    { PaisId: "ES", Nombre: "España" },
    { PaisId: "GT", Nombre: "Guatemala" },
    { PaisId: "JP", Nombre: "Japón" },
    { PaisId: "MX", Nombre: "México" },
    { PaisId: "US", Nombre: "Estados Unidos" },
    { PaisId: "UY", Nombre: "Uruguay" },
  ];

  const [inputValues, setInputValues] = useState({
    id: ultimoValor,
    codigoPostal: "",
    colonia: "",
    entreCalle1: "",
    entreCalle2: "",
    estado: "",
    estadoId: "",
    localidad: "",
    municipio: "",
    municipioId: "",
    nombreVialidad: "",
    numeroExterior: "",
    numeroInterior: "",
    paisId: "",
    tipoVialidad: "",
  });

  const handlePaisChange = (e) => {
    const selectedPaisId = e.target.value;
    setInputValues({
      ...inputValues,
      paisId: selectedPaisId,
      estadoId: selectedPaisId !== "MX" ? "00" : inputValues.estadoId,
      estado: selectedPaisId !== "MX" ? "" : inputValues.estado,
      municipio: selectedPaisId !== "MX" ? "" : inputValues.municipio,
      colonia: selectedPaisId !== "MX" ? "" : inputValues.colonia,
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
        `api/v1/proveedores/${ultimoValor}/DomicilioFiscal`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>Domicilio Fiscal</h2>
      <hr />
      <div className="formulario-container-proveedor">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <label htmlFor="">Codigo Postal</label>
            <input
              type="text"
              placeholder="Tipo de Persona"
              required
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  codigoPostal: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Tipo de vialidad</label>
            <input
              type="text"
              placeholder="Tipo de Persona"
              required
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  tipoVialidad: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Nombre de vialidad</label>
            <input
              type="text"
              placeholder="Tipo de Persona"
              required
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  nombreVialidad: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Pais</label>
            <select
              name="pais"
              id="pais"
              value={inputValues.paisId}
              onChange={handlePaisChange}
              required
            >
              <option value="">Selecciona un país</option>
              {paises.map((pais) => (
                <option key={pais.PaisId} value={pais.PaisId}>
                  {pais.Nombre}
                </option>
              ))}
            </select>
          </div>

          {inputValues.paisId === "MX" && (
            <>
              <div>
                <label htmlFor="">Estado</label>
                <select
                  name="estado"
                  id="estado"
                  value={inputValues.estadoId}
                  onChange={(e) => {
                    const selectedEstadoId = e.target.value;
                    const selectedEstado = estados.find(
                      (estado) => estado.EstadoId === selectedEstadoId
                    );
                    setInputValues({
                      ...inputValues,
                      estadoId: selectedEstadoId,
                      estado: selectedEstado ? selectedEstado.Nombre : "",
                    });
                  }}
                  required
                >
                  <option value="">Selecciona un estado</option>
                  {estados.map((estado) => (
                    <option key={estado.EstadoId} value={estado.EstadoId}>
                      {estado.Nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="">Municipio</label>
                <input
                  type="text"
                  placeholder="Tipo de Persona"
                  required
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      municipio: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Colonia</label>
                <input
                  type="text"
                  placeholder="Tipo de Persona"
                  required
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      colonia: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="">Localidad (Ciudad)</label>
            <input
              type="text"
              placeholder="Tipo de Persona"
              required
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  localidad: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Numero interior</label>
            <input
              type="text"
              placeholder="Tipo de Persona"
              required
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  numeroInterior: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Numero exterior</label>
            <input
              type="text"
              placeholder="Tipo de Persona"
              required
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  numeroExterior: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Calle 1</label>
            <input
              type="text"
              placeholder="Tipo de Persona"
              required
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  entreCalle1: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Calle 2</label>
            <input
              type="text"
              placeholder="Tipo de Persona"
              required
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  entreCalle2: e.target.value,
                })
              }
            />
          </div>
        </div>

        <button onClick={() => console.log(inputValues)}>
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

export default DomicilioFiscal;
