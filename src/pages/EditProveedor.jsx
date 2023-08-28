function EditProveedor() {
  return (
    <div>
      <h2>Editar Proveedor</h2>
      <div className="formulario-container">
        <input type="text" placeholder="Nombre" defaultValue={"Coca-cola"}/>
        <input type="tel" placeholder="Teléfono" />
        <input type="email" placeholder="Correo Electrónico" />
        <input type="text" placeholder="RFC" />
        <button>Confirmar cambios</button>
        <button style={{backgroundColor:"red"}}>Cancelar</button>
      </div>
    </div>
  );
}

export default EditProveedor;
