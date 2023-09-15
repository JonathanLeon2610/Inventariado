import React, { useState, useRef } from "react";

function AdjuntarPDF() {
  const [validFiles, setValidFiles] = useState([]);
  const fileInputRef = useRef(null);

  function isUUID(fileName) {
    // Una implementación simple para verificar si el nombre del archivo es un UUID
    // Puedes ajustar esto según tus necesidades
    const uuidPattern =
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    return uuidPattern.test(fileName);
  }

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newValidFiles = Array.from(files).filter((file) =>
        isUUID(file.name)
      );
      setValidFiles((prevValidFiles) => [...prevValidFiles, ...newValidFiles]);
    }
  };

  const handleUploadButtonClick = () => {
    // Simula el clic en el input de archivo
    fileInputRef.current.click();
  };

  const handleUploadFiles = () => {
    // Realiza la carga de archivos aquí
    validFiles.forEach((file) => {
        console.log(file);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );

      var formdata = new FormData();
      formdata.append("archivo", file, file.name);
      formdata.append("UUID",  file.name);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://192.168.10.100/api/v1/cfdis/recibidos/addfile",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => console.log("error", error));
    });
  };

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
        <button onClick={handleUploadFiles} disabled={validFiles.length === 0}>
          Cargar archivos
        </button>
        <hr />
      </div>
      <div>
        <h3>Archivos Válidos</h3>
        <ul>
          {validFiles.map((file, index) => (
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
