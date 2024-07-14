 
import './App.css';
import Pocetna from './komponente/pocetna/Pocetna';
import LoginComponent from './komponente/loginRegistracija/LoginComponent';
import RegistrationComponent from './komponente/loginRegistracija/RegistrationComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Navbar from './komponente/navbar/Navbar';
import { useState } from 'react';
import Firme from './komponente/firme/Firme';
import StockPrices from './komponente/spoljniApi/StockPrices';
import Vlasnik from './komponente/vlasnik/Vlasnik';
import OneDriveFiles from './komponente/onedrive/OneDriveFiles'; 
import FileUpload from './komponente/radSaFajlovima/FileUpload';
import Statistika from './komponente/Statistike/Statistika';
function App() {
  const [token,setToken]=useState(null);
  return (
    <Router>
       <Navbar  token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/login" element={<LoginComponent setToken={setToken} />} />
          <Route path="/registration" element={<RegistrationComponent />} />
          <Route path="/firme" element={<Firme />} />
          <Route path="/stocks" element={<StockPrices />} />

          <Route path="/vlasnik" element={<Vlasnik />} />
          <Route path="/onedrive" element={<OneDriveFiles />} />    {/*dodat kod za implementaciju onedrive ali ne radi, omogucicemo ovo za seminarski rad*/}
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/statistike" element={<Statistika />} />

        </Routes>
     
    </Router>
  );
}

export default App;
