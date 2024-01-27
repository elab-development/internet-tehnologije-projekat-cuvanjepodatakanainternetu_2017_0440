import React from 'react';
import './Pocetna.css';

function Pocetna() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dobrodošli na OneDrive Integration</h1>
        <p>OneDrive je popularna usluga za čuvanje i deljenje podataka na internetu. Integracija sa OneDrive API-jem omogućava efikasno upravljanje svojim datotekama i folderima na OneDrive-u u okviru tvoje Laravel aplikacije.</p>
      </header>

      <section className="section">
        <div className="content">
          <h2>Zašto OneDrive?</h2>
          <p>OneDrive je jedan od najpopularnijih servisa za čuvanje datoteka na internetu sa velikim brojem korisnika. Nudi pouzdanu i sigurnu uslugu za čuvanje, sinhronizaciju i deljenje podataka.</p>
        </div>
      </section>

      <section className="section">
        <div className="content">
          <h2>Integracija OneDrive API-ja</h2>
          <p>Integracija OneDrive API-ja omogućava tvojoj Laravel aplikaciji pristup i upravljanje datotekama na OneDrive-u. To olakšava deljenje, arhiviranje i rad sa datotekama unutar aplikacije.</p>
        </div>
      </section>

      <section className="section">
        <div className="content">
          <h2>Prednosti OneDrive-a</h2>
          <p>OneDrive nudi niz prednosti, uključujući automatsku sinhronizaciju, pristup datotekama sa bilo kog uređaja i napredne sigurnosne opcije. To ga čini odličnim izborom za čuvanje podataka na internetu.</p>
        </div>
      </section>
    </div>
  );
}

export default Pocetna;
