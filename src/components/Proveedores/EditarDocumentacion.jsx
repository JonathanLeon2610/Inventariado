import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck,faBan} from "@fortawesome/free-solid-svg-icons";
function EditarDocumentacion(){
    return(
        <>
      <h2>Agregar Documento</h2>
      <hr />
      <div className="formulario-container-proveedor">
          <div>
            <div>
              <label htmlFor="">Tipo de documentacion </label>
              <select name="" id="">
                <option value="">Cedula</option>
                <option value="">Constancia fiscal</option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div>
                <label htmlFor="">Ultima fecha de actualizacion</label>
                <input
                    type="date"
                />
            </div>
            <div>
                <label htmlFor="">Referencias</label>
                <input
                    type="text"
                />
            </div>
            <div>
                <label htmlFor="">Archivo</label>
                <input
                    type="file"
                />
            </div>
          </div>
          <button onClick={""}>
            <FontAwesomeIcon icon={faCheck} /> Confirmar Cambios
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => (window.location.href = "/main")}
          >
            <FontAwesomeIcon icon={faBan} /> Cancelar
          </button>
      </div>
    </>
    )
}

export default EditarDocumentacion;