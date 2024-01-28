import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Firma from './Firma';
import './Firma.css';

const Firme = () => {
  const [firme, setFirme] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/firme', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setFirme(response.data.firme);
        console.log(response.data.firme);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <div className="firme-container">
      <h1>Firme</h1>
      <table className="firme-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Naziv</th>
            <th>Adresa</th>
            <th>Vlasnik</th>
            <th>PIB</th>
          </tr>
        </thead>
        <tbody>
          {firme.map((firma) => (
            <Firma key={firma.id} firma={firma} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Firme;
