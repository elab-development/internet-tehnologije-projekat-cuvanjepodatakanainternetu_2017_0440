 
import './App.css';
import Pocetna from './komponente/pocetna/Pocetna';
import LoginComponent from './komponente/loginRegistracija/LoginComponent';
import RegistrationComponent from './komponente/loginRegistracija/RegistrationComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Navbar from './komponente/navbar/Navbar';
import { useState } from 'react';
function App() {
  const [token,setToken]=useState(null);
  return (
    <Router>
       <Navbar  token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/login" element={<LoginComponent setToken={setToken} />} />
          <Route path="/registration" element={<RegistrationComponent />} />
        </Routes>
     
    </Router>
  );
}

export default App;
