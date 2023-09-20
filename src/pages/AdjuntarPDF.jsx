import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

function AdjuntarPDF() {
  const [validFiles, setValidFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const filesUploaded = e.target.files;
    setFiles([...files, ...filesUploaded]);
  };

  const handleUploadButtonClick = () => {
    // Simula el clic en el input de archivo
    fileInputRef.current.click();
  };

  function findCommonFileNames(validFiles, files) {
    validFiles.map((validFile, index) => {
      var validFileName = validFile.fileNameXml.split(".")[0];
      var uuid = validFile.uuid
      files.forEach((file) => {
        if (file.name.split(".")[0] === validFileName) {

          var myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
          );

          var formdata = new FormData();
          formdata.append("archivo", file, file.name);
          formdata.append("UUID", uuid);

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
          };

          fetch(
            import.meta.env.VITE_REACT_APP_API_URL+"api/v1/cfdis/recibidos/addfile",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              Swal.fire(
                "Registro exitoso!",
                "El archivo se ha registrado correctamente",
                "success"
              ).then(() => {
                window.location.href = "/main";
              });
            })
            .catch((error) => console.log("error", error));
        }
      });
    });
  }

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
      import.meta.env.VITE_REACT_APP_API_URL+"api/v1/Cfdis/filtrar?isPDF=false",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setValidFiles(result);
        findCommonFileNames(result, files);
      })
      .catch((error) => console.log("error", error));
  }, [files]);

  return (
    <>
      <div>
        <h2>Subir una o varias facturas (Formato PDF)</h2>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileUpload}
          style={{ display: "none" }}
          ref={fileInputRef}
        />

        <button
          onClick={handleUploadButtonClick}
          style={{ marginInline: "1rem" }}
        >
          Seleccionar archivos
        </button>

        <hr />
      </div>
      <div>
        <h3>Archivos seleccionados</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a
              // href={URL.createObjectURL(file)}
              // target="_blank"
              // rel="noopener noreferrer"
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdjuntarPDF;