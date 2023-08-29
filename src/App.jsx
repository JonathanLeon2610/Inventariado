import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Main from './pages/Main';
import EditProveedor from './pages/EditProveedor';
import Login from './pages/Login';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/edit-proveedor" element={<EditProveedor/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </Router>
  );
}

export default App;
