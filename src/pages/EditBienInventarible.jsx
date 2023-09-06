import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faCheck,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

function EditBienInventariable() {
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
  const [imagesId, setImagesId] = useState([]); // Estado para las imagenes seleccionadas
  const [loadImage, setLoadImage] = useState(null); // Estado para las imagenes seleccionadas
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];

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
      setLoadImage(newImages);
    }
  };

  const handleRemoveImage = (index, id) => {
    const newImages = [...selectedImages];
    console.log(
      `https://192.168.10.100/api/v1/ActivoBien/${ultimoValor}/doctos/del/${id}`
    );
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var raw = "";

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://192.168.10.100/api/v1/ActivoBien/${ultimoValor}/doctos/del/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        newImages.splice(index, 1);
          setSelectedImages(newImages);
      })
      .catch((error) => console.log("error", error));
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
        setSelectedMarca(result.marca);
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
      `https://192.168.10.100/api/v1/ActivoBien/${ultimoValor}/doctos`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const imageUrls = result.map(
          (item) => "https://192.168.10.100/" + item.fileUrl
        );
        setSelectedImages(imageUrls);
        setImagesId(result.map((item) => item.id));
        console.log(result);
      })
      .catch(() => {
        // Manejo de errores
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
        console.log(result);
        // Realiza cualquier acción adicional necesaria después de la actualización
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
            <h2 style={{ marginLeft: "1rem" }}>Editar Bien Inventariable</h2>
            <button
              className="add"
              style={{ marginLeft: "1rem", backgroundColor: "gray" }}
              onClick={() => (window.location.href = "/main")}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Regresar
            </button>
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
                placeholder="activoDescripcion"
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
                  <option key={marca.id} value={marca.id}>
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
                <option value={data.tipoAlta} disabled>
                  {data.tipoAlta}
                </option>
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
              <button onClick={handleEdit}>
                {" "}
                <FontAwesomeIcon icon={faCheck} /> Confirmar cambios
              </button>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() =>
                  Swal.fire({
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
                      window.location.href = "/main";
                    }
                  })
                }
              >
                <FontAwesomeIcon icon={faBan} /> Cancelar
              </button>
              <div className="images-area-container">
                {selectedImages.length > 0 ? (
                  <>
                    <h2>Imagenes disponibles</h2>
                    <div className="images-area">
                      {selectedImages.map((imageSrc, index) => (
                        <>
                          <div key={index} className="image-preview">
                            <span
                              className="remove-image"
                              onClick={() =>
                                Swal.fire({
                                  title:
                                    "¿Estas Seguro de eliminar esta imagen?",
                                  text: "Esta accion no se puede revertir",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Si, Eliminar",
                                  cancelButtonText: "No, Cancelar",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    handleRemoveImage(index, imagesId[index]);
                                    console.log(imagesId[index]);
                                  }
                                })
                              }
                            >
                              &#10005;
                            </span>
                            <img
                              src={imageSrc}
                              alt={`Previsualización de imagen ${index + 1}`}
                            />
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  <h1>No hay imagenes disponibles</h1>
                )}
              </div>

              <div className="images-area-container">
                <div className="images-area">
                  {loadImage ? (
                    <div className="image-preview">
                      <span
                        className="remove-image"
                        onClick={() =>
                          Swal.fire({
                            title: "¿Estas Seguro de eliminar esta imagen?",
                            text: "Esta accion no se puede revertir",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Si, Eliminar",
                            cancelButtonText: "No, Cancelar",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setLoadImage(null);
                            }
                          })
                        }
                      >
                        &#10005;
                      </span>
                      <img src={loadImage} alt={`Previsualización de imagen`} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <button onClick={handleShowFileInput}>
                  <FontAwesomeIcon icon={faUpload} /> Subir nueva Imagen
                </button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
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

export default EditBienInventariable;
