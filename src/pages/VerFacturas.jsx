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
  const recordsPerPage = 30;

  const [filterCriteria, setFilterCriteria] = useState({
    uuid: "",
    emisorRFC: "",
    fecha: "",
    emisorNombre: "",
    folio: "",
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
    setCurrentPage(1)
  };

  const handleFileChange = (event, rowIndex, type) => {
    const selectedFiles = event.target.files;
    setFile(selectedFiles);

    if (type === 2) {
      const updatedData = [...data];
      updatedData[rowIndex].hasPDFFile = true;
      setdata(updatedData);
    } else {
      const updatedData = [...data];
      updatedData[rowIndex].hasXMLFile = true;
      setdata(updatedData);
    }
  };

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const isLastPage = currentPage === totalPages;

  const handleDelete = (uuid, type) => {
    console.log(
      import.meta.env.VITE_REACT_APP_API_URL+"api/v1/cfdis/recibidos/delFile/" +
        type +
        "/" +
        uuid
    );
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
        import.meta.env.VITE_REACT_APP_API_URL+"api/v1/cfdis/recibidos/delFile/" +
        type +
        "/" +
        uuid,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
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
      import.meta.env.VITE_REACT_APP_API_URL+"api/v1/cfdis/recibidos/addfile",
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

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL+"api/v1/Cfdis/filtrar?CantidadRegistros=100000",
      requestOptions
    )
    .then((response) => response.json())
    .then((result) => {
      const filteredResult = result.filter((item) => {
        const {
          uuid,
          emisor_RFC,
          comprobante_Fecha,
          emisor_Nombre,
          comprobante_Folio,
        } = item;
        const {
          uuid: filterUUID,
          emisorRFC: filterRFC,
          fecha: filterFecha,
          emisorNombre: filterNombre,
          folio: filterFolio,
        } = filterCriteria;
    
        // Verificar y proporcionar valores predeterminados para todos los campos
        const uuidToCompare = uuid ?? "";
        const emisor_RFCToCompare = emisor_RFC ?? "";
        const comprobante_FechaToCompare = comprobante_Fecha ?? "";
        const emisor_NombreToCompare = emisor_Nombre ?? "";
        const comprobante_FolioToCompare = comprobante_Folio ?? "-";
    
        return (
          uuidToCompare.includes(filterUUID) &&
          emisor_RFCToCompare.includes(filterRFC) &&
          comprobante_FechaToCompare.includes(filterFecha) &&
          emisor_NombreToCompare.includes(filterNombre) &&
          comprobante_FolioToCompare.includes(filterFolio)
        );
      });

        setFilteredData(filteredResult);
      })
      .catch((error) => console.log("error", error));
  }, [filterCriteria]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

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
        <form className="filter-form no-print">
          <label>UUID:</label>
          <input
            type="text"
            name="uuid"
            value={filterCriteria.uuid}
            onChange={handleFilterChange}
          />

          <label>Nombre del Emisor:</label>
          <input
            type="text"
            name="emisorNombre"
            value={filterCriteria.emisorNombre}
            onChange={handleFilterChange}
          />

          <label>RFC del Emisor:</label>
          <input
            type="text"
            name="emisorRFC"
            value={filterCriteria.emisorRFC}
            onChange={handleFilterChange}
          />

          <label>Folio:</label>
          <input
            type="text"
            name="folio"
            value={filterCriteria.folio}
            onChange={handleFilterChange}
          />

          <label>Fecha:</label>
          <input
            type="text"
            name="fecha"
            value={filterCriteria.fecha}
            onChange={handleFilterChange}
          />
        </form>
      </div>
      <table className="table-to-print">
        <thead>
          <tr>
            <th colSpan="12">Lista de facturas -- Pagina # {currentPage}</th>
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
        <tbody>
          {currentRecords.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.uuid}</td>
              <td>{item.emisor_Nombre}</td>
              <td>{item.emisor_RFC}</td>
              <td>{item.comprobante_Folio !== null ?(item.comprobante_Folio):("")}</td>
              <td>${item.comprobante_Total.toLocaleString("en")}</td>
              <td>{item.comprobante_Fecha}</td>
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
                  <>
                    <input
                      type="file"
                      accept=".xml"
                      onChange={(event) => handleFileChange(event, index, 1)}
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
                )}
              </td>
              <td className="no-print">
                {item.isPDF === true ? (
                  <>
                    {console.log(item)}
                    <a
                      href={item.fileUrlPdf}
                      target="blank"
                      download={item.fileUrlPdf}
                    >
                      <button className="free">
                        <FontAwesomeIcon icon={faDownload} /> Descargar
                      </button>
                    </a>
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
        {!isLastPage && (
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            Siguiente <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </button>
        )}
      </div>
    </>
  );
}

export default VerFacturas;
