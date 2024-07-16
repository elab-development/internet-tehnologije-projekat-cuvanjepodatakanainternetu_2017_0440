import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pocetna.css';

const API_KEY = 'zM19eZg0Jr4RhQVLUhaTPNinI23m3tFsZDzzZD1M';
const companyNames = ['Microsoft', 'Google', 'Amazon', 'Apple', 'Facebook', 'Tesla', 'IBM', 'Intel', 'Samsung', 'Oracle'];
const CACHE_KEY = 'logosCache';

function Pocetna() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const cachedLogos = localStorage.getItem(CACHE_KEY);
        if (cachedLogos) {
          setLogos(JSON.parse(cachedLogos));
        } else {
          const logoRequests = companyNames.map(name => 
            axios.get('https://api.api-ninjas.com/v1/logo', {
              headers: {
                'X-Api-Key': API_KEY
              },
              params: {
                name
              }
            })
          );
          
          const logoResponses = await Promise.all(logoRequests);
          const logos = logoResponses.map(response => response.data[0]); // Pretpostavimo da je prvi rezultat najrelevantniji
          setLogos(logos);
          localStorage.setItem(CACHE_KEY, JSON.stringify(logos));
        }
      } catch (error) {
        console.error('Error fetching logos:', error);
      }
    };

    fetchLogos();
  }, []);

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

      <section className="section sponsors-section">
        <div className="content">
          <h2>Naši sponzori</h2>
          <div className="logos-container">
            {logos.map((logo, index) => (
              <div key={index} className="logo-item">
                <img src={logo.image} alt={logo.name} />
                <p>{logo.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pocetna;
