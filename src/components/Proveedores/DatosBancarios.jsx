import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
function DatosBancarios(){
    return(
        <>
        <h2>Datos Bancarios</h2>
        <hr />
       <div className="formulario-container-proveedor">
       <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <label htmlFor="">Banco</label>
                <select name="" id="">
                  <option value="4">Nacional</option>
                  <option value="5">Extranjero</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Cuenta</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">Sucursal</label>
                <input type="text" placeholder="Tipo de Persona" required />
              </div>
              <div>
                <label htmlFor="">CLABE(18 Digitos)</label>
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

export default DatosBancarios;