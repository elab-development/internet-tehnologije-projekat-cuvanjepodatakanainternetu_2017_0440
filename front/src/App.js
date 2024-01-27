 
import './App.css';
import Pocetna from './komponente/pocetna/Pocetna';
import LoginComponent from './komponente/loginRegistracija/LoginComponent';
import RegistrationComponent from './komponente/loginRegistracija/RegistrationComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Navbar from './komponente/navbar/Navbar';
function App() {
  return (
    <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/registration" element={<RegistrationComponent />} />
        </Routes>
     
    </Router>
  );
}

export default App;
