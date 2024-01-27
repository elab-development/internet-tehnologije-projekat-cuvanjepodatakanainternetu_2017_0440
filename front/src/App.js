 
import './App.css';
import Pocetna from './komponente/pocetna/Pocetna';
import LoginComponent from './komponente/loginRegistracija/LoginComponent';
import RegistrationComponent from './komponente/loginRegistracija/RegistrationComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/registration" element={<RegistrationComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
