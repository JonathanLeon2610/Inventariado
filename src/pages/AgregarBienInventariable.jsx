import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function AgregarBienInventariable() {
  const [data, setdata] = useState([]);
  const [inputValues, setInputValues] = useState({
    ActivoTipo :"",
    NumeroInventario : "",
    ActivoDescripcion :"",
    MarcaId : "4",
    Modelo : "",
    NumeroSerie :"",
    Costo : "",
    TipoAlta :"Compra",
    Comentarios :"",
  });

  useEffect(() => {
    fetch("https://192.168.10.100/api/v1/marcas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);



  const handleEdit = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json"); // Agrega el tipo de contenido JSON

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(inputValues), // Convierte el estado inputValues a JSON
      redirect: "follow",
    };
    
    console.log(inputValues);

    fetch(
      `https://192.168.10.100/api/v1/activobien`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // Realiza cualquier acción adicional necesaria después de la actualización
        Swal.fire(
          'Registro exitoso!',
          'Se ha realizado su registro satisfactoriamente!',
          'success'
        )
        .then(() => {
          window.location.href = "/main"
        })
        console.log(result,"hola");
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title:"Hubo un error al crear el registro",
          text: 'Por favor intente nuevamente',
        })
        .then(()=>{
          //window.location.href = "/login"
        })
      });

  };
  return (
    <>
      <div>
        <h2 style={{ marginLeft: "1rem" }}>Agregar Bien Inventariable</h2>
        <div className="formulario-container">
          <input
            type="text"
            placeholder="Tipo de Activo"
            onChange={(e) =>
              setInputValues({ ...inputValues, ActivoTipo: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="No. Inventario"
            onChange={(e) =>
              setInputValues({ ...inputValues, NumeroInventario: e.target.value })
            }
            required
          />
          <input type="text" placeholder="Descripcion"   onChange={(e) =>
              setInputValues({ ...inputValues, ActivoDescripcion: e.target.value })
            } 
            required
            />
          <select onChange={(e) =>
              setInputValues({ ...inputValues, MarcaId: e.target.value })
            }>
            {data.map((marca) =>(
                <>
                <option value={(marca.id).toString()}>{marca.name}</option>
                </>
            ))}
          </select>
          
          <input type="text" placeholder="Modelo"  onChange={(e) =>
              setInputValues({ ...inputValues, Modelo: e.target.value })
            }
            required/>
          <input type="text" placeholder="No. Serie" onChange={(e) =>
              setInputValues({ ...inputValues, NumeroSerie: e.target.value })
            }
            required/>
          <input type="numer" pattern="[0-9]*" placeholder="Costo" onChange={(e) =>
              setInputValues({ ...inputValues, Costo: e.target.value })
            }required/>
          <select onChange={(e) =>
              setInputValues({ ...inputValues, TipoAlta: e.target.value })
            }>
            <option value={"compra"}>Compra</option>
            <option value={"Dato"}>Como Dato</option>
            <option value={"donacion"}>Donaciòn</option>
            <option value={"otro"}>Otro</option>
          </select>
          <button onClick={handleEdit}>Registrar</button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => history.back()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}

export default AgregarBienInventariable;
