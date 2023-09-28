import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Main from './pages/Main';
import EditProveedor from './pages/EditProveedor';
import Login from './pages/Login';
import EditBienInventariable from './pages/EditBienInventarible';
import AgregarBienInventariable from './pages/AgregarBienInventariable';
import TablaImportarBien from './pages/TablaImportarBien';
import ImportarBienInventariable from './pages/ImportarBienInventariable';
import Reporte from './components/Reporte';
import VerFacturas from './pages/VerFacturas';
import FacturasProveedor from './components/Proveedores/FactutasProveedor';





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
        <Route path="/verFacturas" element={<VerFacturas/>}/>
        <Route path="/facturasProveedor/:id" element={<FacturasProveedor/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
