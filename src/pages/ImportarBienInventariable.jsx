import { useEffect, useState,useRef } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft,faUpload, faCheck, faBan} from "@fortawesome/free-solid-svg-icons";
function ImportarBienInventariable() {
  const [inputValues, setInputValues] = useState({
    id: "",
    activoTipo: "",
    numeroInventario: "",
    activoDescripcion: "",
    MarcaId: "",
    modelo: "",
    numeroSerie: "",
    caracteristicas: "",
    comentarios: "",
    tipoAlta: "",
    costo: "",
    estatusBienId: "1",
  });

  const [data, setData] = useState(null);
  const [marcas, setMarcas] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedMarca, setSelectedMarca] = useState(""); // Estado para la marca seleccionada
  const [selectedImages, setSelectedImages] = useState([]); // Estado para la imagen seleccionada


  const fileInputRef = useRef(null); // Ref para el input de archivo oculto
  const handleShowFileInput = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  useEffect(() => {
    const url = window.location.pathname;
    const segments = url.split("/");
    const ultimoValor = segments[segments.length - 1];

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
      `https://192.168.10.100/api/v1/activobien/${ultimoValor}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setInputValues({
          id: ultimoValor,
          activoDescripcion: result.activoDescripcion,
          costo: result.costo,
          marcaId: result.marcaId,
          modelo: result.modelo,
        });
        setData(result);
        console.log(result);
        setSelectedMarca(result.marca);
        console.log(inputValues);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Tu sesión ha expirado",
          text: "Vuelve a iniciar sesión",
        }).then(() => {
          window.location.href = "/login";
        });
      });
  }, []);

  useEffect(() => {
    fetch("https://192.168.10.100/api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMarcas(data);
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

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: inputValues, // Convierte el estado inputValues a JSON
      redirect: "follow",
    };

    fetch(
      `https://192.168.10.100/api/v1/activobien/${ultimoValor}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // Realiza cualquier acción adicional necesaria después de la actualización
        console.log(result);
        console.log(inputValues);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {data !== null ? (
        <>
          <div>
            <h2 style={{ marginLeft: "1rem" }}>Importar Bien Inventariable</h2>
            <button className="add" style={{marginLeft:"1rem", backgroundColor:"gray"}} onClick={() => (window.location.href = "/table-import-bien-inventariable")}><FontAwesomeIcon icon={faArrowLeft}/> Regresar</button>
            <div className="formulario-container">
              <input
                type="text"
                placeholder="Tipo de Activo"
                defaultValue={data.activoTipo}
                onChange={(e) =>
                  setInputValues({ ...inputValues, activoTipo: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Numero de Inventario"
                defaultValue={data.numeroInventario}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    numeroInventario: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Descripcion"
                defaultValue={data.activoDescripcion}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    activoDescripcion: e.target.value,
                  })
                }
              />
              <select
                defaultValue={inputValues.marcaId}
                onChange={(e) =>
                  setInputValues({ ...inputValues, marca: e.target.value })
                }
              >
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}
                  >
                    {marca.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Modelo"
                defaultValue={data.modelo}
                onChange={(e) =>
                  setInputValues({ ...inputValues, modelo: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Caracteristicas (Opcional)"
                defaultValue={data.caracteristicas}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    caracteristicas: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Comentarios (Opcional)"
                defaultValue={data.comentarios}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    comentarios: e.target.value,
                  })
                }
              />

              <select
                onChange={(e) =>
                  setInputValues({ ...inputValues, TipoAlta: e.target.value })
                }
              >
                <option value={"compra"}>Compra</option>
                <option value={"Dato"}>Como Dato</option>
                <option value={"donacion"}>Donaciòn</option>
                <option value={"otro"}>Otro</option>
              </select>

              <input
                type="number"
                placeholder="Costo"
                defaultValue={data.costo}
                onChange={(e) =>
                  setInputValues({ ...inputValues, costo: e.target.value })
                }
              />
              <button onClick={handleEdit}> <FontAwesomeIcon icon={faCheck}/> Importar Bien</button>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => Swal.fire({
                  title: "¡Estas Seguro?",
                  text: "Se perderan los cambios realizados",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si, Salir",
                  cancelButtonText: "No, Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/table-import-bien-inventariable";
                  }
                })}
              >
                <FontAwesomeIcon icon={faBan}/> Cancelar
              </button>
              <div className="images-area-container">
                <div className="images-area">
                {selectedImages.map((imageSrc, index) => (
                    <div key={index} className="image-preview">
                      <span
                        className="remove-image"
                        onClick={() => handleRemoveImage(index)}
                      >
                        &#10005;
                      </span>
                      <img src={imageSrc} alt={`Previsualización de imagen ${index + 1}`} />
                    </div>
                  ))}

                </div>
                <button onClick={handleShowFileInput}><FontAwesomeIcon icon={faUpload}/> Subir  Imagen</button>
                <input
                  type="file"
                  accept="image/*" // Puedes ajustar los tipos de archivos que acepta
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  multiple
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando</p>
      )}
    </>
  );
}

export default ImportarBienInventariable;
