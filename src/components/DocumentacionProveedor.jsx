import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
function DocumentacionProveedor(){
    return(
        <>
        <div className="tabla-facturas-proveedor-container">
        <button
          className="import"
          style={{ backgroundColor: "orange",marginLeft:"1rem", marginTop:"1rem"}}
          onClick={() => window.print()}
        >
          <FontAwesomeIcon icon={faPrint} /> Imprimir Tabla
        </button>
        <table className="table-to-print">
          <thead>
            <tr>
              <th colSpan="12">Lista de documentos</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Tipo de documentacion</th>
              <th>Ultima fecha de actualizacion</th>
              <th>Referencias</th>
              <th className="no-print">Archivo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="no-print">
                    <button className="free "><FontAwesomeIcon icon={faDownload} /> Descargar documento</button>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
        </>
    )
}

export default DocumentacionProveedor;