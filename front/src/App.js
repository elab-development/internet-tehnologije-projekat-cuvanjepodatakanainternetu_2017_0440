import logo from './logo.svg';
import './App.css';
import Pocetna from './komponente/pocetna/Pocetna';
import LoginComponent from './komponente/loginRegistracija/LoginComponent';
import RegistrationComponent from './komponente/loginRegistracija/RegistrationComponent';

function App() {
  return (
    <div  >
        <Pocetna></Pocetna>
        <LoginComponent></LoginComponent>
        <RegistrationComponent></RegistrationComponent>
    </div>
  );
}

export default App;
