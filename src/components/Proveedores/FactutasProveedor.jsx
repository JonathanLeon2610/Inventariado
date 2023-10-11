import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
function FacturasProveedor() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(1);
  const recordsPerPage = 25;

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const url = window.location.pathname;
  const segments = url.split("/");
  const ultimoValor = segments[segments.length - 1];

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
        `api/v1/Cfdis/filtrar?Emisor_RFC=${ultimoValor}&Pagina=${currentPage}&CantidadRegistros=${recordsPerPage}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch(() => console.log("Error: CODIGO #3"));
  }, [currentPage]);

  return (
    <>
      <div className="tabla-facturas-proveedor-container">
        <button
          className="import"
          style={{ backgroundColor: "orange",marginLeft:"1rem", marginTop:"1rem"}}
          onClick={() => window.print()}
        >
          {" "}
          <FontAwesomeIcon icon={faPrint} /> Imprimir Tabla
        </button>
        <div className="filter-form" style={{marginLeft:"1rem"}}>
          <label>Desde:</label>
          <input type="date" placeholder="Introducir fecha minima" name="minFecha" onChange={(e) =>setMinDate((e.target.value))}/>
          <label>Hasta:</label>
          <input type="date" placeholder="Introducir fecha maxima" name="maxFecha" />
          <button className="add" >
            Buscar <FontAwesomeIcon icon={faSearch} />{" "}
          </button>
        </div>
        <table className="table-to-print">
          <thead>
            <tr>
              <th colSpan="12">Lista de facturas -- Pagina #{currentPage}</th>
            </tr>
            <tr>
              <th>#</th>
              <th>UUI</th>
              <th>Nombre del emisor</th>
              <th>RFC del emisor</th>
              <th>Folio</th>
              <th>Total</th>
              <th>Fecha</th>
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
                </tr>
              ))}
            </tbody>
          ) : (
            <h1 style={{ marginLeft: "1rem" }}>
              No hay registros para mostrar
            </h1>
          )}
        </table>
      </div>
    </>
  );
}

export default FacturasProveedor;
