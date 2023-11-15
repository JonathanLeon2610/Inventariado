import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import EditProveedor from './components/Proveedores/EditProveedor';
import EditBienInventariable from './components/Bienes/EditBienInventarible';
import AgregarBienInventariable from './components/Bienes/AgregarBienInventariable';
import VerFacturas from './components/Facturas/VerFacturas';
import DocumentacionProveedor from './components/Proveedores/DocumentacionProveedor';
import ImportarBienInventariable from "./components/Bienes/ImportarBienInventariable"
import TablaImportarBien from "./components/Bienes/TablaImportarBien"
import Login from "./pages/Login"
import Main from './pages/Main';
import Reporte from "./pages/Reporte"
import AgregarProveedor from "./components/Proveedores/AgregarProveedor"
import FacturasProveedor from "./components/Proveedores/FactutasProveedor"





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/edit-proveedor/:id" element={<EditProveedor/>}/>
        <Route path="/import-bien-inventariable" element={<ImportarBienInventariable/>}/>
        <Route path="/table-import-bien-inventariable" element={<TablaImportarBien/>}/>
        <Route path="/edit-bien-inventariable/:id" element={<EditBienInventariable/>}/>
        <Route path="/agregar-bien-inventariable" element={<AgregarBienInventariable/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reporte" element={<Reporte/>}/>
        <Route path="/agregar-proveedor" element={<AgregarProveedor/>}/>
        <Route path="/verFacturas" element={<VerFacturas/>}/>
        <Route path="/facturasProveedor/:id" element={<FacturasProveedor/>}/>
        <Route path="/documentacion-proveedor/:id" element={<DocumentacionProveedor/>}/>
        <Route path="/agregarBien" element={<AgregarBienInventariable/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
