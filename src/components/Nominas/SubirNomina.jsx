import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faBan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function SubirNomina() {
  const [xmlDataList, setXmlDataList] = useState([]);
  const [rawXmlFiles, setRawXmlFiles] = useState([]);
  const [inputValuesList, setInputValuesList] = useState([]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const xmlPromises = [];
      const validFiles = [];

  
      for (const file of files) {
        if (file.name.toLowerCase().endsWith('.xml')) {
          validFiles.push(file);
          xmlPromises.push(
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                const xmlString = event.target.result;
                resolve(xmlString);
              };
              reader.readAsText(file);
            })
          );
        } else {
          console.log(`Skipping non-XML file: ${file.name}`);
        }
      }
  
      if (xmlPromises.length > 0) {
        Promise.all(xmlPromises)
          .then((xmlDataArray) => {
            setXmlDataList(xmlDataArray);
            setRawXmlFiles(validFiles);
          })
          .catch((error) => {
            console.error("Error reading files:", error);
            // Eliminar el último archivo de la lista de archivos brutos
            if (validFiles.length > 0) {
              validFiles.pop();
            }
            setRawXmlFiles(validFiles);
            // Puedes agregar un código aquí para manejar el error, si es necesario.
          });
      }
    }
  };
  
  
  
  
  

  useEffect(() => {
    if (xmlDataList.length > 0) {
      const parsedDataList = [];
  
      for (const xmlData of xmlDataList) {
        let dataItem = null;
  
        try {
            
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, "text/xml");
          if (xmlDoc.getElementsByTagName("cfdi:Emisor")[0].getAttribute("Rfc") === import.meta.env.VITE_REACT_APP_RFC_TRIBUNAL){
            dataItem = {
                uuid: xmlDoc
                  .getElementsByTagName("cfdi:Complemento")[0]
                  .getElementsByTagName("tfd:TimbreFiscalDigital")[0]
                  .getAttribute("UUID"),
                emisor_Nombre: xmlDoc
                  .getElementsByTagName("cfdi:Emisor")[0]
                  .getAttribute("Nombre"),
                emisor_RFC: xmlDoc
                  .getElementsByTagName("cfdi:Emisor")[0]
                  .getAttribute("Rfc"),
                comprobante_Fecha: xmlDoc
                  .getElementsByTagName("cfdi:Comprobante")[0]
                  .getAttribute("Fecha"),
                comprobante_Folio: xmlDoc
                  .getElementsByTagName("cfdi:Comprobante")[0]
                  .getAttribute("Folio"),
                comprobante_Version: xmlDoc
                  .getElementsByTagName("cfdi:Comprobante")[0]
                  .getAttribute("Version"),
                comprobante_Total: xmlDoc
                  .getElementsByTagName("cfdi:Comprobante")[0]
                  .getAttribute("Total"),
                comprobante_TipoDeComprobante: xmlDoc
                  .getElementsByTagName("cfdi:Comprobante")[0]
                  .getAttribute("TipoDeComprobante"),
                receptor_RFC: xmlDoc
                  .getElementsByTagName("cfdi:Receptor")[0]
                  .getAttribute("Rfc"),
                comprobante_Serie: xmlDoc
                  .getElementsByTagName("cfdi:Comprobante")[0]
                  .getAttribute("Serie"),
              };
          }
          else{
            dataItem= null
            Swal.fire('Este archivo no corresponde al Tribunal')
          }
        } catch (error) {
          console.error("Error parsing XML:", error);
          dataItem= null
          Swal.fire('Se han ingorado algunos archivo que no cumplian con el formato deaseado')
        }
  
        if (dataItem) {
          parsedDataList.push(dataItem);
        }
      }
      setInputValuesList(parsedDataList);
    }
  }, [xmlDataList]);
  
  
  

  const handlePost = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(inputValuesList);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL + `api/v1/cfdis/recibidos/addmany`,
      requestOptions
    )
    .then((response) => response.json())
    .then((result) => {

      result.map((registro,index)=>{
        if (registro.isXML === false){
          
          var myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
          );

          var formdata = new FormData();
          formdata.append("Archivo", rawXmlFiles[index], rawXmlFiles[index].name);
          formdata.append("UUID", registro.uuid ?? "");
          formdata.append("Emisor RFC", registro.emisor_RFC ?? "");
          formdata.append("Emisor Nombre", registro.emisor_Nombre ?? "");
          formdata.append("Receptor RFC", registro.receptor_RFC ?? "");
          formdata.append("Comprobante Serie", registro.comprobante_Serie ?? "");
          formdata.append("Comprobante Folio", registro.comprobante_Folio ?? "");
          formdata.append("Comprobante Version", registro.comprobante_Version ?? "");
          formdata.append("Comprobante Fecha", registro.comprobante_Fecha ?? "");
          formdata.append("Comprobante Total", registro.comprobante_Total ?? "");

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          

          fetch(import.meta.env.VITE_REACT_APP_API_URL+"api/v1/cfdis/recibidos/addfile", requestOptions)
          .then(response => response.text())
          .then(() => {
  
            Swal.fire(
              "Registro exitoso!",
              "La factura se ha registrado correctamente, el siguiente paso es adjuntar el PDF, puedes hacerlo en la ventana de 'Adjuntar(PDF)' o bien ver el registro en la ventana de 'Visualizar'",
              "success"
            ).then(() => {
              setXmlDataList([])
            });
          })
          .catch(error => console.log('error', error));
        }
        else{
          Swal.fire('El registro con el UUID: ' + registro.uuid + " ya tiene un archivo XML subido")
        }
      })

    })
    .catch((error) => console.log("error", error));
  };

  return (
    <div>
  <h2>Subir nomina (Formato XML)</h2>
  <input type="file" accept=".xml" multiple onChange={handleFileUpload} />
  <hr />
  {xmlDataList.length > 0 ? (
    <>
      <table>
        <thead>
          <tr>
            <th>UUID</th>
            <th>Nombre del Emisor</th>
            <th>RFC del Emisor</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>RFC del Receptor</th>
            <th>Folio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {inputValuesList.map((xmlData, index) => (
            <tr key={index}>
              <td>
                <p>{inputValuesList[index]?.uuid || ""}</p>
              </td>
              <td>
                <p>{inputValuesList[index]?.emisor_Nombre || ""}</p>
              </td>
              <td>
                <p>{inputValuesList[index]?.emisor_RFC || ""}</p>
              </td>
              <td>
                <p>{inputValuesList[index]?.comprobante_Fecha || ""}</p>
              </td>
              <td>
                <p>${inputValuesList[index]?.comprobante_Total  || ""}MXN</p>
              </td>
              <td>
                <p>{inputValuesList[index]?.receptor_RFC || ""}</p>
              </td>
              <td>
                <p>{inputValuesList[index]?.comprobante_Folio || ""}</p>
              </td>
              <td>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    const updatedXmlDataList = [...xmlDataList];
                    updatedXmlDataList.splice(index, 1);
                    setXmlDataList(updatedXmlDataList);

                    const updatedInputValuesList = [...inputValuesList];
                    updatedInputValuesList.splice(index, 1);
                    setInputValuesList(updatedInputValuesList);
                  }}
                >
                  <FontAwesomeIcon icon={faBan} /> Quitar factura
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="add"
        style={{ marginTop: "1rem" }}
        onClick={() => 
          Swal.fire({
            title: 'Confirmar facturas',
            showDenyButton: true,
            confirmButtonText: 'Registrar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
              handlePost();
            }
          })
        }
      >
        <FontAwesomeIcon icon={faUpload} /> Subir facturas
      </button>
    </>
  ) : (
    <p>Selecciona uno o varios archivos XML para previsualizar.</p>
  )}
</div>


  );
}

export default SubirNomina;
