import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faPrint,
  faDownload,
  faBan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function VerFacturas() {
  const [data, setdata] = useState([]);
  const [file, setFile] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;

  const handleFileChange = (event, rowIndex,type) => {
    const selectedFiles = event.target.files;
    // Realiza acciones con los archivos seleccionados
    setFile(selectedFiles);

    // Actualiza el estado para indicar que se ha cargado un archivo en la fila específica
    if (type === 2){
      const updatedData = [...data];
      updatedData[rowIndex].hasPDFFile = true;
      setdata(updatedData);
    }
    else{
      const updatedData = [...data];
      updatedData[rowIndex].hasXMLFile = true;
      setdata(updatedData);
    }
  };

  const handleDelete = (uuid, type) => {
    console.log("https://192.168.10.100/api/v1/cfdis/recibidos/delFile/"+type+"/"+uuid);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var formdata = new FormData();

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://192.168.10.100/api/v1/cfdis/recibidos/delFile/"+type+"/"+uuid,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
      })
      .catch((error) => console.log("error", error));
  };

  const handleUpload = (uuid, file) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var formdata = new FormData();
    formdata.append("archivo", file[0], file[0].name);
    formdata.append("UUID", uuid);

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
        console.log(result);
        Swal.fire(
          "Registro exitoso!",
          "El archivo se ha registrado correctamente",
          "success"
        ).then(() => {
          window.location.href = "/main";
        });
      })
      .catch((error) => console.log("error", error));
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

    fetch("https://192.168.10.100/api/v1/Cfdis/filtrar", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setdata(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <div className="no-print">
        <h2>Tabla de facturas</h2>
        <button
          className="import"
          style={{ marginLeft: "1rem", backgroundColor: "orange" }}
          onClick={() => window.print()}
        >
          {" "}
          <FontAwesomeIcon icon={faPrint} /> Imprimir Tabla
        </button>
        <table className="table-to-print">
          <thead>
            <tr>
              <th colSpan="6">Lista de facturas</th>
            </tr>
            <tr>
              <th>UUI</th>
              <th>Nombre del emisor</th>
              <th>RFC del emisor</th>
              <th>Folio</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Archivo XML</th>
              <th>Arhivo PDF</th>
              {/* {allowAddButton() ? <th className="option-button">Opciones</th> : ""} */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{item.uuid}</td>
                <td>{item.emisor_Nombre}</td>
                <td>{item.emisor_RFC}</td>
                <td>{item.comprobante_Folio}</td>
                <td>${item.comprobante_Total.toLocaleString("en")}</td>
                <td>{item.comprobante_Fecha}</td>
                <td>
                  {item.isXML === true ? (
                    <>
                      <a href={item.fileUrlXml} target="blank" download={item.fileNameXml}>
                        <button className="free">
                          <FontAwesomeIcon icon={faDownload} /> Descargar
                        </button>
                      </a>
                      <button style={{ backgroundColor: "red" }} 
                      onClick={() => {Swal.fire({
                        title: "¡Estas Seguro?",
                        text: "Se borrarà solo el archivo, no el registro",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, borrar archivo",
                        cancelButtonText: "No, Cancelar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete(item.uuid, 1);
                          window.location.href = "/main";
                        }
                      });}}
                      >
                        <FontAwesomeIcon icon={faBan} /> Eliminar
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept=".xml"
                        onChange={(event) => handleFileChange(event, index,1)}
                      />
                      {item.hasXMLFile === true ? (
                        <button
                          className="add"
                          onClick={() => handleUpload(item.uuid, file)}
                        >
                          <FontAwesomeIcon icon={faUpload} /> Subir archivo
                        </button>
                      ) : (
                        ""
                      )}
                    </>
                  )}{" "}
                </td>
                <td>
                  {item.isPDF === true ? (
                    <>
                    {console.log(item)}
                      <a href={item.fileUrlPdf} target="blank" download={item.fileUrlPdf}>
                        <button className="free">
                          <FontAwesomeIcon icon={faDownload} /> Descargar
                        </button>
                      </a>
                      <button style={{ backgroundColor: "red" }} 
                      onClick={() => {Swal.fire({
                        title: "¡Estas Seguro?",
                        text: "Se borrarà solo el archivo, no el registro",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, borrar archivo",
                        cancelButtonText: "No, Cancelar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete(item.uuid, 2);
                          window.location.href = "/main";
                        }
                      });
                    }}
                      >
                        <FontAwesomeIcon icon={faBan} /> Eliminar
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(event) => handleFileChange(event, index, 2)}
                      />
                      {item.hasPDFFile === true ? (
                        <button
                          className="add"
                          onClick={() => handleUpload(item.uuid, file)}
                        >
                          <FontAwesomeIcon icon={faUpload} /> Subir archivo
                        </button>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {currentPage > 1 && (
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Anterior
            </button>
          )}
          {data.length === recordsPerPage && (
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Siguiente <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default VerFacturas;
