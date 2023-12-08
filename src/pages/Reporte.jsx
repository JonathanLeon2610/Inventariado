function Reporte() {
  return (
    <>
      <div className="reporte-body">
        <div className="reporte-title-container">
          <h3>
            SECRETARIA DE FINANZAS Y ADMINISTRACION DE GOBIERNO DEL ESTADO DE
            BAJA CALIFORNIA SUR
          </h3>
          <p>
            Regimen Fiscal: Regimen de personas morales con fines no lucrativos
          </p>
          <p>RFC: SFG9312205S3</p>
          <p>Lugar de Expedicion: LA PAZ, B.C.S A "FECHA ACTUAL"</p>
        </div>
        <div className="info-reporte-nomina-container">
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>No. Factura</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>Periodo de pago</b>
            </p>
            <hr />
            <p>01/01/2023 - 15/01/2023</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>No.</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>Nombre</b>
            </p>
            <hr />
            <p>Angelica Arenal Ceseña</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>CURP</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>RFC</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>NUM. ISSTE</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>Puesto</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>Clave Presupuestal</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>CURP</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>Num. Cheque</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>Banco</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
          <div className="casilla-reporte-nomina">
            <p className="casilla-title">
              <b>Dias</b>
            </p>
            <hr />
            <p>161316316</p>
          </div>
        </div>
        <div className="data-reporte-nomina-container">
          <div className="data-reporte-nomina-table-container">
            <div style={{ textAlign: "center" }}>
              <p>
                <b>Percepciones</b>
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Clave</th>
                    <th>Descripcion</th>
                    <th>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Percepcion 1</td>
                    <td>$100.00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Percepcion 2</td>
                    <td>$150.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="data-reporte-nomina-table-container">
            <div style={{ textAlign: "center" }}>
              <p>
                <b>Deducciones</b>
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Clave</th>
                    <th>Descripcion</th>
                    <th>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Deduccion 1</td>
                    <td>$20.00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Deduccion 2</td>
                    <td>$30.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="total-reporte-nomina-container">
          <div style={{display:"flex",gap:"2px"}}>
            <p>Total Percepciones:</p>
            <p style={{border:"solid .5px", marginInline:".5px"}}>$16511</p>
          </div>
          <div style={{display:"flex",gap:"2px"}}>
            <p>Total Deducciones:</p>
            <p style={{border:"solid .5px", marginInline:".5px"}}>$16511</p>
          </div>
          <div style={{display:"flex",gap:"2px"}}>
            <p><b>Neto a pagar:</b></p>
            <p style={{border:"solid .5px", marginInline:".5px"}}>$16511</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Reporte;
