import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

function AdjuntarPDF() {
  // eslint-disable-next-line no-unused-vars
  const [validFiles, setValidFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const filesUploaded = e.target.files;
    setFiles([...files, ...filesUploaded]);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  function findCommonFileNames(validFiles, files) {
    validFiles.map((validFile) => {
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
            .then(() => {
              Swal.fire(
                "Registro exitoso!",
                "El archivo PDF se ha registrado correctamente, puedes ver el regsitro en la ventana de 'Visualizar'",
                "success"
              )
            })
            .catch(() => console.log("error: CODIGO #2"));
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
      .catch(() => console.log("error: CODIGO #1"));
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
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
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