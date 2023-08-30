import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Main from './pages/Main';
import EditProveedor from './pages/EditProveedor';
import Login from './pages/Login';
import EditBienInventariable from './pages/EditBienInventarible';
import AgregarBienInventariable from './pages/AgregarBienInventariable';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/edit-proveedor" element={<EditProveedor/>}/>
        <Route path="/edit-bien-inventariable/:id" element={<EditBienInventariable/>}/>
        <Route path="/agregar-bien-inventariable" element={<AgregarBienInventariable/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </Router>
  );
}

export default App;
