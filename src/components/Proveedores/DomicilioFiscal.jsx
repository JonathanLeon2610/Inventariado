import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function DomicilioFiscal() {
  const [data, setData] = useState([]);
  const [municipios, setMunicipios] = useState([]);
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
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/SoftwareContable/Municipios/${inputValues.estadoId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMunicipios(result)
      })
      .catch((error) => console.log("error", error));
  }, [inputValues.estadoId]);

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

  const handleMunicipioChange = (e) => {
    const selectedMunicipioId = e.target.value;
    console.log(parseInt(selectedMunicipioId))
    const selectedMunicipio = municipios.find(
      (municipio) => municipio.municipioId === parseInt(selectedMunicipioId)
    );
    console.log(selectedMunicipio);
    setInputValues({
      ...inputValues,
      municipioId: selectedMunicipioId,
      municipio: selectedMunicipio ? selectedMunicipio.municipio : "",
    });
  };


  const handleEdit = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: ultimoValor,
      codigoPostal: inputValues.codigoPostal,
      colonia: inputValues.colonia,
      entreCalle1: inputValues.entreCalle1,
      entreCalle2: inputValues.entreCalle2,
      estado: inputValues.estado,
      estadoId: inputValues.estadoId,
      localidad: inputValues.localidad,
      municipio: inputValues.municipio,
      municipioId: inputValues.municipioId,
      nombreVialidad: inputValues.nombreVialidad,
      numeroExterior: inputValues.numeroExterior,
      numeroInterior: inputValues.numeroInterior,
      paisId: inputValues.paisId,
      tipoVialidad: inputValues.tipoVialidad
    });

    console.log(raw);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/proveedores/${ultimoValor}/DomicilioFiscal`,
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
        `api/v1/proveedores/${ultimoValor}/DomicilioFiscal`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setInputValues({
          id: ultimoValor,
          codigoPostal: result.codigoPostal,
          colonia: result.colonia,
          entreCalle1: result.entreCalle1,
          entreCalle2: result.entreCalle2,
          estado: result.estado,
          estadoId: result.estadoId,
          localidad: result.localidad,
          municipio: result.municipio,
          municipioId: result.municipioId,
          nombreVialidad: result.nombreVialidad,
          numeroExterior: result.numeroExterior,
          numeroInterior: result.numeroInterior,
          paisId: result.paisId,
          tipoVialidad: result.tipoVialidad
        });
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
              defaultValue={data.codigoPostal}
              placeholder="Codigo postal"
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
              placeholder="Tipo de vialidad (Calle, boulevard, etc)"
              defaultValue={data.tipoVialidad}
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
              placeholder="Nombre de la vialidad"
              defaultValue={data.nombreVialidad}
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
                  id="estado"
                  defaultValue={inputValues.estadoId}
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
                  <option value={data.estadoId}>{data.estado}</option>
                  {estados.map((estado) => (
                    <>
                      <option key={estado.EstadoId} value={estado.EstadoId}>
                        {estado.Nombre}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="">Municipio</label>
                <select
                  name="municipio"
                  id="municipio"
                  defaultValue={inputValues.municipioId}
                  onChange={handleMunicipioChange}
                  required
                >
                  <option value="">{data.municipio}</option>
                  {municipios.map((municipio) => (
                    <option
                      key={municipio.Nombre}
                      value={municipio.municipioId}
                    >
                      {municipio.municipio}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Colonia</label>
                <input
                  type="text"
                  placeholder="Nombre de la colinia"
                  defaultValue={data.colonia}
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
              placeholder="Nombre de la localidad"
              defaultValue={data.localidad}
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
              placeholder="No. Interior"
              defaultValue={data.numeroInterior}
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
              placeholder="No. Exterior"
              defaultValue={data.numeroExterior}
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
              placeholder="Calle 1"
              defaultValue={data.entreCalle1}
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
              placeholder="Calle 2"
              defaultValue={data.entreCalle2}
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

        <button onClick={() => handleEdit()}>
          <FontAwesomeIcon icon={faCheck} /> Confirmar Cambios
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
