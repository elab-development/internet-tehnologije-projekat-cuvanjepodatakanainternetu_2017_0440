import './App.css';
import Pocetna from './komponente/pocetna/Pocetna';
import LoginComponent from './komponente/loginRegistracija/LoginComponent';
import RegistrationComponent from './komponente/loginRegistracija/RegistrationComponent';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  
import Navbar from './komponente/navbar/Navbar';
import { useState, useEffect } from 'react';
import Firme from './komponente/firme/Firme';
import StockPrices from './komponente/spoljniApi/StockPrices';
import Vlasnik from './komponente/vlasnik/Vlasnik';
import OneDriveFiles from './komponente/onedrive/OneDriveFiles'; 
import FileUpload from './komponente/radSaFajlovima/FileUpload';
import Statistika from './komponente/Statistike/Statistika';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    const savedUser = JSON.parse(sessionStorage.getItem('user'));
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  return (
    <Router>
      <Navbar token={token} user={user} handleLogout={handleLogout} />
      <Routes>
        {/* neulogovani */}
        <Route path="/" element={<Pocetna />} />
        <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
        <Route path="/registration" element={<RegistrationComponent />} />
        <Route path="/stocks" element={<StockPrices />} />
        
        {/* admin */}
        {user?.uloga === 'admin' && (
          <>
            <Route path="/firme" element={<Firme />} />
            <Route path="/statistike" element={<Statistika />} />
          </>
        )}

        {/* vlasnik */}
        {user?.uloga === 'vlasnik' && (
          <Route path="/vlasnik" element={<Vlasnik />} />
        )}

        {/* zaposleni */}
        {user?.uloga === 'zaposleni' && (
          <Route path="/fileupload" element={<FileUpload />} />
        )}

        {/* Preusmeravanje na početnu stranicu za nepoznate rute */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
