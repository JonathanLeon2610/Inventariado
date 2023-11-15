import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faBan,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function AgregarBienInventariable() {
  const [data, setdata] = useState([]);
  const [buscarNum, setBuscarNum] = useState("");
  const [bloq, setBloq] = useState(false);
  const [inputValues, setInputValues] = useState({
    NumeroInventario: "",
    activoDescripcion: "",
    MarcaId: 0,
    Marca: "",
    Modelo: "",
    NumeroSerie: "",
    Costo: "",
    TipoAlta: null,
    Comentarios: "",
    Caracteristicas: "",
    PartidaEspecifica:"",
    CategoriaId: "0",
    CfdiDate:"1900-01-01",
    CfdiDetalleId:"0",
    CfdiId:"0",
    EstatusBienId:"1",
    GrupoId:"0",
    SaacgNetActivoId:"0",
    subcategoriaId:"0"
  });

  const handleClear = () => {
    
    setInputValues({
      NumeroInventario: "",
      activoDescripcion: "",
      MarcaId: 0,
      Marca: "",
      Modelo: "",
      NumeroSerie: "",
      Costo: "",
      TipoAlta: "",
      Comentarios: "",
      Caracteristicas: "",
      PartidaEspecifica:""
    });
    setBloq(false);
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_API_URL + "api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch(() => console.log("error: CODIGO: 1"));
  }, []);

  const handleEdit = () => {
    console.log(inputValues);
    const requiredFields = [
      "NumeroInventario",
      "activoDescripcion",
      "Marca",
      "Modelo",
      "NumeroSerie",
      "TipoAlta",
    ];
  
    const missingFields = requiredFields.filter((field) => {
      const value = inputValues[field];
      console.log(value);
      // Verifica si el campo está vacío, es undefined o no cumple con la longitud requerida
      return value === undefined || value === "" || (field === "NumeroInventario" && (value.length <= 4 || value.length > 20));
    });
  
    if (missingFields.length > 0) {
      // Display an error message with the missing fields
      const missingFieldsMessage = `Por favor asegúrese de que cumplen con los requisitos`;
      Swal.fire({
        icon: "error",
        title: "Campos faltantes o inválidos",
        text: missingFieldsMessage,
      });
      return;
    }
  
  
    // Continue with the API request if all required fields are filled
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(inputValues),
      redirect: "follow",
    };

    
  
    fetch(import.meta.env.VITE_REACT_APP_API_URL + `api/v1/activobien`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        Swal.fire("Registro exitoso!", "Se ha realizado su registro satisfactoriamente!", "success").then(() => {
          localStorage.setItem("currentPage", "inventariable");
          window.location.href = "/main";
        });
      })
      .catch(() => {
        // Handle the error case
        Swal.fire({
          icon: "error",
          title: "Hubo un error al crear el registro",
          text: "Por favor, inténtelo nuevamente.",
        });
        console.log("Error: CODIGO #2");
      });
  };
  
  
  

  const handleConsult = () => {
    setBloq(true)
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
      `https://192.168.10.109/api/v1/softwarecontable/activobien/${buscarNum}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setInputValues({
          NumeroInventario: result.numeroInventario,
          activoDescripcion: result.activoDescripcion,
          MarcaId: result.marcaId,
          Marca: result.marcaId === 1 ? ("***") : (result.marca),
          Modelo: result.modelo,
          NumeroSerie: result.numeroSerie,
          Costo: result.costo,
          TipoAlta: result.tipoAlta,
          Comentarios: result.comentarios,
          Caracteristicas: result.caracteristicas,
          PartidaEspecifica: result.partidaEspecifica,
          CategoriaId:  result.categoriaId,
          CfdiDate: result.cfdiDate,
          CfdiDetalleId: result.cfdiDetalleId,
          CfdiId: result.cfdiId,
          EstatusBienId: result.estatusBienId,
          GrupoId: result.grupoId,
          SaacgNetActivoId: result.saacgNetActivoId,
          subcategoriaId: result.subcategoriaId
        });
      })
      .catch((error) => console.log("error", error));
  };



  return (
    <>
      <div>
        <h2>Agregar Bien Inventariable</h2>
        <div
          className="filter-form"
        >
          <label>Importar por No. Inventario:</label>
          <input
            type="text"
            name="noInventario"
            placeholder="Introducir No.Inventario"
            onChange={(e) => setBuscarNum(e.target.value)}
            
          />
          <button className="add" onClick={handleConsult}>
            Buscar <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className="add" style={{backgroundColor:"#1d62c4"}} onClick={handleClear}>
            Limpiar campos <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="formulario-container">
          <div>
            <label htmlFor="">Numero inventario</label>
            <input
            type="text"
            minLength={4}
            placeholder="No. Inventario"
            value={inputValues.NumeroInventario}
            disabled={bloq===true ? true : false}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                NumeroInventario: e.target.value,
              })
            }
            required
          />
          </div>
          <div style={{display:"flex", alignItems:"center"}}>
            <label htmlFor="">Descripcion</label>
            <textarea
              style={{ marginLeft:"1rem", paddingTop:"1rem" }}
              defaultValue={inputValues.activoDescripcion}
              disabled={bloq===true ? true : false}
              placeholder="Descripcion"
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  activoDescripcion: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="">Marca</label>
            <select
            onChange={(e) => {
              const selectedMarcaId = e.target.value;
              const selectedMarca = data.find(
                (marca) => {
                  return marca.id === parseInt(selectedMarcaId);
                }
              );           
              setInputValues({
                ...inputValues,
                MarcaId: selectedMarcaId,
                Marca: selectedMarca ? selectedMarca.name : "",
              });
            }}
          >
            <option value={0}>{inputValues.Marca  || "Seleccione una marca"}</option>
            {data.map((marca) => (
              <>
                <option
                  value={marca.id.toString()}
                  onClick={() =>
                    setInputValues({ ...inputValues, Marca: marca.name })
                  }
                >
                  {marca.name}
                </option>
              </>
            ))}
          </select>
          </div>

          <div>
            <label htmlFor="">Modelo</label>
            <input
            type="text"
            value={inputValues.Modelo}
            placeholder="Modelo"
            onChange={(e) =>
              setInputValues({ ...inputValues, Modelo: e.target.value })
            }
            required
          />
          </div>
          <div>
            <label htmlFor="">Numero de serie </label>
            <input
            type="text"
            value={inputValues.NumeroSerie}

            placeholder="No. Serie"
            onChange={(e) =>
              setInputValues({ ...inputValues, NumeroSerie: e.target.value })
            }
            required
          />
          </div>
          <div>
            <label htmlFor="">Partida Especifica</label>
            <input
            defaultValue={inputValues.PartidaEspecifica}
            type="number"
            pattern="[0-9]*"
            placeholder="Partida Especifica"
            disabled={bloq===true ? true : false}
            onChange={(e) =>
              setInputValues({ ...inputValues, PartidaEspecifica: e.target.value })
            }
            required
          />
          </div>

          <div style={{display:"flex", alignItems:"center"}}>
            <label htmlFor="">Caracteristicas</label>
            <textarea
            style={{ marginLeft:"1rem", paddingTop:"1rem" }}
            type="text"
            placeholder="Caracteristicas (Opcional)"
            value={inputValues.Caracteristicas}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                Caracteristicas: e.target.value,
              })
            }
          />
          </div>

          <div style={{display:"flex", alignItems:"center"}}>
            <label htmlFor="">Comentarios</label>
            <textarea
            style={{ marginLeft:"1rem", marginTop:"1rem" }}
            type="text"
            placeholder="Comentarios (Opcional)"
            value={inputValues.Comentarios}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                Comentarios: e.target.value,
              })
            }
          />
          </div>
          <div>
            <label htmlFor="">Costo</label>
            <input
              value={inputValues.Costo}
              type="number"
              pattern="[0-9]*"
              placeholder="Costo"
              disabled={bloq === true ? true : false}
              onChange={(e) =>
                setInputValues({ ...inputValues, Costo: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="">Tipo de alta</label>
            <select
            disabled={bloq===true ? true : false}
            onChange={(e) =>
              setInputValues({ ...inputValues, TipoAlta: e.target.value })
            }
          >
            {!inputValues.TipoAlta ? (<option value={"COMPRA"}>COMPRA</option>) : (<option value={inputValues.TipoAlta}>{inputValues.TipoAlta}</option>) }
            <option value={"COMODATO"}>COMODATO</option>
            <option value={"DONACION"}>DONACION</option>
            <option value={"OTRO"}>OTRO</option>
          </select>
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
      </div>
    </>
  );
}

export default AgregarBienInventariable;
