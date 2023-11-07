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
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedImages, setSelectedImages] = useState([]); 
  const [imagesId, setImagesId] = useState([]); 
  const [loadImage, setLoadImage] = useState(null); 
  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];
  // eslint-disable-next-line no-unused-vars
  const [fileName, setFileName] = useState(null);

  const fileInputRef = useRef(null); 
  const handleShowFileInput = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_API_URL+"api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMarcas(data);
      })
      .catch(() => console.log('Error: CODIGO #5'));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const allowedImageFormats = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
  
      if (allowedImageFormats.includes(fileExtension)) {
        setFileName(file.name);
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
        var formdata = new FormData();
        formdata.append("Archivo", file, file.name);
        formdata.append("ActivoBienId", ultimoValor);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
  
        fetch(import.meta.env.VITE_REACT_APP_API_URL + "api/v1/ActivoBien/doctos/add", requestOptions)
          .then(response => response.text())
          .then(() => {
            window.location.reload();
          })
          .catch(() => console.log('Error: CODIGO #1'));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Formato de archivo no válido. Por favor, sube una imagen en formato jpg, jpeg o png.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El tamaño máximo permitido es 5MB",
      });
    }
  };
  
  

  const handleRemoveImage = (index, id) => {
    const newImages = [...selectedImages];
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
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/ActivoBien/${ultimoValor}/doctos/del/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then(() => {
        newImages.splice(index, 1);
        setSelectedImages(newImages);
      })
      .catch(() => console.log('Error: CODIGO #2'));
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
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/activobien/${ultimoValor}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setInputValues({
          id: ultimoValor,
          activoDescripcion: result.activoDescripcion,
          numeroInventario: result.numeroInventario,
          numeroSerie:result.numeroSerie,
          caracteristicas: result.caracteristicas,
          comentarios: result.comentarios,
          tipoAlta: result.tipoAlta,
          estatusBienId: result.estatusBienId,
          costo: result.costo,
          MarcaId: result.marcaId,
          modelo: result.modelo,
        });
        setData(result);
        setSelectedMarca(result.marca);
      })
      .catch(() => {
        console.log('Error: CODIGO #3')
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
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/ActivoBien/${ultimoValor}/doctos`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const imageUrls = result.map(
          (item) => item.fileUrl
        );
        setSelectedImages(imageUrls);
        setImagesId(result.map((item) => item.id));
      })
      .catch(() => console.log('Error: CODIGO #4'));
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
    myHeaders.append("Content-Type", "application/json");




    var raw = JSON.stringify({
      "id": inputValues.id,
      "activoDescripcion": inputValues.activoDescripcion,
      "numeroInventario": inputValues.numeroInventario,
      "numeroSerie": inputValues.numeroSerie,
      "caracteristicas": inputValues.caracteristicas,
      "comentarios": inputValues.comentarios,
      "tipoAlta": inputValues.tipoAlta,
      "estatusBienId": 1,
      "costo": inputValues.costo,
      "marcaId": inputValues.MarcaId,
      "modelo": inputValues.modelo
    });


    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };


    fetch(
      import.meta.env.VITE_REACT_APP_API_URL+`api/v1/activobien/${ultimoValor}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
      })
      .catch(() => {
        console.log('Error: CODIGO #6')
        Swal.fire(
          "Registro exitoso!",
          "Los cambios se han aplicado exitosamente!",
          "success"
        ).then(() => {
          window.location.href = "/main";
        });
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
             <div>
              <label htmlFor="">Numero de inventario</label>
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
                disabled
              />
             </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <label htmlFor="">Descripcion</label>
                <textarea style={{ marginLeft:"1rem", paddingTop:"1rem" }}
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
              </div>
              <div>
                <label htmlFor="">Marca</label>
                <select
                  value={inputValues.MarcaId}
                  onChange={(e) =>
                    setInputValues({ ...inputValues, MarcaId: e.target.value })
                  }
                >
                  {inputValues.MarcaId !== "" && (
                    <option value={inputValues.MarcaId}>
                      {marcas.find((marca) => marca.id === inputValues.MarcaId)?.name}
                    </option>
                  )}
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                      {marca.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="">Modelo</label>
                <input
                type="text"
                placeholder="Modelo"
                defaultValue={data.modelo}
                onChange={(e) =>
                  setInputValues({ ...inputValues, modelo: e.target.value })
                }
              />
              </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <label htmlFor="">Caracteristicas</label>
                <textarea style={{ marginLeft:"1rem", paddingTop:"1rem" }}
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
              </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <label htmlFor="">Comentarios</label>
                <textarea style={{ marginLeft:"1rem", paddingTop:"1rem", marginTop:"1rem" }}
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
              </div>

              <div>
                <label htmlFor="">Tipo de alta</label>
                <select
                onChange={(e) =>
                  setInputValues({ ...inputValues, tipoAlta: e.target.value })
                }
              >
                <option value={data.tipoAlta} >
                  {data.tipoAlta}
                </option>
                <option value={"compra"}>COMPRA</option>
                <option value={"Dato"}>DATO</option>
                <option value={"donacion"}>DONACION</option>
                <option value={"otro"}>OTRO</option>
              </select>
              <div>
                <label htmlFor="">Costo</label>
                <input
                type="number"
                placeholder="Costo"
                defaultValue={data.costo}
                onChange={(e) =>
                  setInputValues({ ...inputValues, costo: e.target.value })
                }
              />
              </div>
              </div>
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
              <h3>Imagenes del bien</h3>
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
                    <>
                      <div style={{ display: "flex", flexDirection: "column" }}>
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
                          <img
                            src={loadImage}
                            alt={`Previsualización de imagen`}
                          />
                        </div>
                        <button>Confirmar Imagen</button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {loadImage ? (
                  ""
                ) : (
                  <>
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
                  </>
                )}
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
