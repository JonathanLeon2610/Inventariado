function Inicio(){
    return(
        <>
            <h1>Tribunal de Justicia Administrativa del Estado de Baja California Sur</h1>
            <h2>Bienvenido/a, {localStorage.getItem("nombre")}</h2>
            <h3>Rol asignado: {localStorage.getItem("role")}</h3>
            <img src={import.meta.env.VITE_REACT_APP_API_URL + "images/logotipo.png"} alt="No carga" style={{width:"50vh"}}/>
            <hr />
            <p>Tribunal de Justicia Administrativa del Estado de Baja California Sur.</p>
        </>
    )
}

export default Inicio;