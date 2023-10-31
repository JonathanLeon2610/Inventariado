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
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function VerFacturas() {
  const [data, setdata] = useState([]);
  const [file, setFile] = useState([]);

  const [PDF, setPDF] = useState(true);
  const [XML, setXML] = useState(true);
  const [UUID, setUUID] = useState("");
  const [RFC, setRFC] = useState("");
  const [fechaDesde, setFechaDesde] = useState("1900-01-01");
  const [fechaHasta, setFechaHasta] = useState("1900-01-01");
  const [isFechaDesdeEnabled, setIsFechaDesdeEnabled] = useState(true);
  const [isFechaHastaEnabled, setIsFechaHastaEnabled] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;

  const handleFileChange = (event, rowIndex, type) => {
    const selectedFiles = event.target.files;
  
    if (type === 2) { // PDF
      if (selectedFiles.length === 0 || !selectedFiles[0].name.toLowerCase().endsWith('.pdf')) {
        event.target.value = null; // Resetea el valor del campo de entrada
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Formato de archivo invalido',
        })
      } else {
        setFile(selectedFiles);
  
        const updatedData = [...data];
        updatedData[rowIndex].hasPDFFile = true;
        setdata(updatedData);
      }
    } else { // XML
      if (selectedFiles.length === 0 || !selectedFiles[0].name.toLowerCase().endsWith('.xml')) {
        event.target.value = null; // Resetea el valor del campo de entrada
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Formato de archivo invalido',
        })
      } else {
        setFile(selectedFiles);
  
        const updatedData = [...data];
        updatedData[rowIndex].hasXMLFile = true;
        setdata(updatedData);
      }
    }
  };
  
  
  

  const handleDelete = (uuid, type) => {
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
      import.meta.env.VITE_REACT_APP_API_URL +
        "api/v1/cfdis/recibidos/delFile/" +
        type +
        "/" +
        uuid,
      requestOptions
    )
      .then((response) => response.text())
      .then(() => {})
      .catch(() => console.log("Error: CODIGO #1"));
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
      import.meta.env.VITE_REACT_APP_API_URL + "api/v1/cfdis/recibidos/addfile",
      requestOptions
    )
      .then((response) => response.text())
      .then(() => {
        Swal.fire(
          "Registro exitoso!",
          "El archivo se ha registrado correctamente",
          "success"
        ).then(() => {
          window.location.href = "/main";
        });
      })
      .catch(() => console.log("Error: CODIGO #2"));
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
        `api/v1/Cfdis/filtrar?isPDF=${PDF}&isXML=${XML}&Emisor_RFC=${RFC}&UUID=${UUID}&Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setdata(result);
      })
      .catch(() => console.log("Error: CODIGO #3"));
  }, [currentPage]);

  const handleChangeData = (PDF, XML) => {
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

    setCurrentPage(1);

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `api/v1/Cfdis/filtrar?isPDF=${PDF}&isXML=${XML}&Emisor_RFC=${RFC}&UUID=${UUID}&Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}&ByRecibidos=${!isFechaDesdeEnabled}&FechaDesde=${fechaDesde}&FechaHasta=${fechaHasta}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setdata(result);
      })
      .catch(() => console.log("Error: CODIGO #4"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "uuid":
        setUUID(value);
        break;
      case "emisorRFC":
        setRFC(value);
        break;
      case "fechaDesde":
        setFechaDesde(value);
        break;
      case "fechaHasta":
        setFechaHasta(value);
        break;
      }
  };

  return (
    <>
      <div>
        <div className="no-print">
          <h2>Tabla de facturas</h2>
          <button
            className="import"
            style={{ backgroundColor: "orange" }}
            onClick={() => window.print()}
          >
            {" "}
            <FontAwesomeIcon icon={faPrint} /> Imprimir Tabla
          </button>
          <div className="filter-form">
            <label>UUID:</label>
            <input
              type="text"
              name="uuid"
              onChange={handleChange}
              placeholder="Introducir UUID"
            />
            <label>RFC del Emisor:</label>
            <input
              type="text"
              name="emisorRFC"
              onChange={handleChange}
              placeholder="Introducir RFC (Emisor)"
            />

            <label>Sin PDF:</label>
            <input
              type="checkbox"
              name="noPDF"
              onChange={() => {
                setPDF(!PDF);
              }}
            />

            <label>Sin XML:</label>
            <input
              type="checkbox"
              name="XML"
              onChange={() => {
                setXML(!XML);
              }}
            />
            <button
              onClick={() => {
                setIsFechaDesdeEnabled(!isFechaDesdeEnabled);
                setIsFechaHastaEnabled(!isFechaHastaEnabled);
                console.log(isFechaDesdeEnabled);
              }}
              className="add"
              style={{backgroundColor:"brown"}}
            >
              Habilitar Fechas
            </button>

            <label>Fecha Desde:</label>
            <input
              type="date"
              name="fechaDesde"
              onChange={handleChange}
              disabled={isFechaDesdeEnabled}
            />

            <label>Fecha Hasta:</label>
            <input
              type="date"
              name="fechaHasta"
              onChange={handleChange}
              disabled={isFechaHastaEnabled}
            />

            <button
              onClick={() => handleChangeData(PDF, XML, UUID, RFC)}
              className="add"
            >
              Buscar <FontAwesomeIcon icon={faSearch} />{" "}
            </button>

            
          </div>
        </div>

        <table className="table-to-print">
          <thead>
            <tr>
              <th colSpan="12">Lista de facturas -- Pagina #{currentPage}</th>
            </tr>
            <tr>
              <th>#</th>
              <th>UUID</th>
              <th>Nombre del emisor</th>
              <th>RFC del emisor</th>
              <th>Folio</th>
              <th>Total</th>
              <th>Fecha</th>
              <th className="no-print">Archivo XML</th>
              <th className="no-print">Archivo PDF</th>
            </tr>
          </thead>
          {data.length > 0 && data ? (
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.uuid}</td>
                  <td>{item.emisor_Nombre}</td>
                  <td>{item.emisor_RFC}</td>
                  <td>{item.comprobante_Folio}</td>
                  <td>${item.comprobante_Total.toLocaleString("en")}</td>
                  <td>{new Date(item.comprobante_Fecha).toLocaleString()}</td>
                  <td className="no-print">
                    {item.isXML === true ? (
                      <>
                        <a
                          href={item.fileUrlXml}
                          target="blank"
                          download={item.fileNameXml}
                        >
                          <button className="free">
                            <FontAwesomeIcon icon={faDownload} /> Descargar
                          </button>
                        </a>
                        {localStorage
                          .getItem("role")
                          .includes(
                            import.meta.env.VITE_REACT_APP_ADM_COMPRAS
                          ) ? (
                          <>
                            <button
                              style={{ backgroundColor: "red" }}
                              onClick={() => {
                                Swal.fire({
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
                                });
                              }}
                            >
                              <FontAwesomeIcon icon={faBan} /> Eliminar
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          accept=".xml"
                          onChange={(event) =>
                            handleFileChange(event, index, 1)
                          }
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
                  <td className="no-print">
                    {item.isPDF === true ? (
                      <>
                        <a
                          href={item.fileUrlPdf}
                          target="blank"
                          download={item.fileUrlPdf}
                        >
                          <button className="free">
                            <FontAwesomeIcon icon={faDownload} /> Descargar
                          </button>
                        </a>
                        {localStorage
                          .getItem("role")
                          .includes(
                            import.meta.env.VITE_REACT_APP_ADM_COMPRAS
                          ) ? (
                          <>
                            <button
                              style={{ backgroundColor: "red" }}
                              onClick={() => {
                                Swal.fire({
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
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(event) =>
                            handleFileChange(event, index, 2)
                          }
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
          ) : (
            <h1 style={{ marginLeft: "1rem" }}>
              No hay registros para mostrar
            </h1>
          )}
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
