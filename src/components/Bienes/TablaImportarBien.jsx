import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faFileImport} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function TablaImportarBien() {
  return (
    <>
        <h2 style={{marginLeft:"1rem"}}>Selecciona el bien que desees importar</h2>
        <button className="add" style={{marginLeft:"1rem", backgroundColor:"gray"}} onClick={() => (window.location.href = "/main")}><FontAwesomeIcon icon={faArrowLeft}/> Regresar</button>
        <div className="importar-bien">
        <table style={{width:"95%"}}>
          <thead >
            <tr>
              <th># Inventario</th>
              <th>Descripcion</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th># Serie</th>
              <th>Costo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>
                    <Link to={`/import-bien-inventariable`}>
                      <button className="add">
                        <FontAwesomeIcon icon={faFileImport} /> Importar
                      </button>
                    </Link>
                 </td>
            </tr>
            <tr>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>
                    <Link to={`/edit-bien-inventariable/`}>
                      <button className="add">
                        <FontAwesomeIcon icon={faFileImport} /> Importar
                      </button>
                    </Link>
                 </td>
            </tr>
            <tr>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>Prubeba #1</td>
                <td>
                    <Link to={`/import-bien-inventariable`}>
                      <button className="add">
                        <FontAwesomeIcon icon={faFileImport} /> Importar
                      </button>
                    </Link>
                 </td>
            </tr>
            {/* {data.map((item) => (
              <tr key={item.id}>
                <td>{item.numeroInventario}</td>
                <td>{item.activoDescripcion}</td>
                <td>{getMarcaNameById(item.marcaId)}</td>
                <td>{item.modelo}</td>
                <td>{item.numeroSerie}</td>
                <td>${item.costo.toLocaleString("en")}</td>
                {allowAddButton() ? (
                  <td>
                    <Link to={`/edit-bien-inventariable/${item.id}`}>
                      <button className="free">
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </button>
                    </Link>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TablaImportarBien;
