import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
function EditarDocumentacion() {
  const [data, setData] = useState([]);
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];
  const [inputValues, setInputValues] = useState({
    id: parseInt(ultimoValor),
    DocumentoTipoId: 0,
    Reference: "",
    FechaActualizacion: "",
    Archivo: ""
  });

  const handleSubmit = () => {
    if(inputValues.DocumentoTipoId === 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay seleccionado un tipo de documento',
      })
    }
    else{
      var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
  
    var formdata = new FormData();
    formdata.append("ProveedorId", parseInt(ultimoValor));
    formdata.append("DocumentoTipoId", parseInt(inputValues.DocumentoTipoId));
    formdata.append("Reference", inputValues.Reference);
    formdata.append("FechaActualizacion", inputValues.FechaActualizacion);
    formdata.append("Archivo", inputValues.Archivo[0], inputValues.Archivo[0].name);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/Proveedores/doctos/add`,
      requestOptions
    )
      .then((response) => response.text())
      .then(() => {
        Swal.fire(
          "Registro exitoso!",
          "Se ha registrado correctamente el documento",
          "success"
        )
      })
      .catch((error) => console.log("error", error));
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
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/documentotipos/vlist/5`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  
  return (
    <>
      <h2>Agregar Documento</h2>
      <hr />
      <div className="formulario-container-proveedor">
        <div>
          <div>
            <label htmlFor="">Tipo de documentacion </label>
            <select name="" id="" onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  DocumentoTipoId: parseInt(e.target.value),
                })
              }>
                <option value={0}>Seleccione un tipo de documento</option>
              {data.map((item) => (
                <>
                <option value={item.id} key={item.name}>{item.name}</option>
                </>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Ultima fecha de actualizacion</label>
            <input type="date"  onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  FechaActualizacion: e.target.value,
                })
              }/>
          </div>
          <div>
            <label htmlFor="">Referencias</label>
            <input type="text" onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  Reference: e.target.value,
                })
              }/>
          </div>
          <div>
            <label htmlFor="">Archivo</label>
            <input type="file" onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  Archivo: e.target.files,
                })
              }/>
          </div>
        </div>
        <button onClick={()=> handleSubmit()}>
          <FontAwesomeIcon icon={faCheck} /> Agregrar documento
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

export default EditarDocumentacion;
