import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Firma from './Firma';
import './Firma.css';

const Firme = () => {
  const [firme, setFirme] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");  
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/firme', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setFirme(response.data.firme);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const toggleSortOrder = () => {
    
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedFirme = [...firme].sort((a, b) => {
    
    const firmaA = a.naziv.toLowerCase();
    const firmaB = b.naziv.toLowerCase();

    if (firmaA < firmaB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (firmaA > firmaB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredFirme = sortedFirme.filter((firma) => {
    const { naziv, PIB, vlasnik, adresa } = firma;
    const vlasnikImePrezime = `${vlasnik.ime} ${vlasnik.prezime}`.toLowerCase();

    return (
      naziv.toLowerCase().includes(searchTerm) ||
      PIB.toLowerCase().includes(searchTerm) ||
      adresa.toLowerCase().includes(searchTerm) ||
      vlasnikImePrezime.includes(searchTerm)
    );
  });

  return (
    <div className="firme-container">
      <h1>Firme</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pretraži firmu..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="sort-container">
        <button onClick={toggleSortOrder}>
          Sortiraj po nazivu: {sortOrder === "asc" ? "Rastuće" : "Opadajuće"}
        </button>
      </div>
      <table className="firme-table">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Adresa</th>
            <th>Vlasnik</th>
            <th>PIB</th>
          </tr>
        </thead>
        <tbody>
          {filteredFirme.map((firma) => (
            <Firma key={firma.id} firma={firma} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Firme;
