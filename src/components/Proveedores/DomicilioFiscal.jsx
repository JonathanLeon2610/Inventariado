import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
function DomicilioFiscal(){
    return(
        <>
        <h2>Domicilio Fiscal</h2>
        <hr />
       <div className="formulario-container-proveedor">
       <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <label htmlFor="">Codigo Postal</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Tipo de vialidad</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Nombre de vialidad</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Pais</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Estado</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Municipio</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Colonia</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Localidad</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Numero interior</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Numero exterior</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Calle 1</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Calle 2</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
            </div>

          <button>
            <FontAwesomeIcon icon={faCheck} /> Registrar
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

export default DomicilioFiscal;