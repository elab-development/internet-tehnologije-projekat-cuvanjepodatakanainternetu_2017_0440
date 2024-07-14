import React, { useState } from 'react';
import axios from 'axios';
import Firma from './Firma';
import './Firma.css';
import useFirme from '../kuke/useFirme';
import useVlasnici from '../kuke/useVlasnici';

const Firme = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [newFirma, setNewFirma] = useState({ naziv: '', adresa: '', vlasnik_id: '', PIB: '', logo: '' });
  const [editingFirma, setEditingFirma] = useState(null);
  const token = sessionStorage.getItem('token');
  const { firme, loading, error } = useFirme('http://127.0.0.1:8000/api/firme', token);
  const { vlasnici, loading: vlasniciLoading, error: vlasniciError } = useVlasnici('http://127.0.0.1:8000/api/vlasnici', token);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFirma({ ...newFirma, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingFirma({ ...editingFirma, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/firme', newFirma, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewFirma({ naziv: '', adresa: '', vlasnik_id: '', PIB: '', logo: '' });
      // Update state after adding a new firma
      window.location.reload();
    } catch (error) {
      console.error('Error creating firma:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/firme/${editingFirma.id}`, editingFirma, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingFirma(null);
      // Update state after updating a firma
      window.location.reload();
    } catch (error) {
      console.error('Error updating firma:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/firme/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update state after deleting a firma
      window.location.reload();
    } catch (error) {
      console.error('Error deleting firma:', error);
    }
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
      {loading && <p>Učitavanje...</p>}
      {error && <p>Došlo je do greške prilikom učitavanja.</p>}
      {!loading && !error && (
        <>
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
          <form onSubmit={editingFirma ? handleUpdate : handleSubmit} className="firma-form">
            <input
              type="text"
              name="naziv"
              placeholder="Naziv"
              value={editingFirma ? editingFirma.naziv : newFirma.naziv}
              onChange={editingFirma ? handleEditInputChange : handleInputChange}
              required
            />
            <input
              type="text"
              name="adresa"
              placeholder="Adresa"
              value={editingFirma ? editingFirma.adresa : newFirma.adresa}
              onChange={editingFirma ? handleEditInputChange : handleInputChange}
              required
            />
            <select
              name="vlasnik_id"
              value={editingFirma ? editingFirma.vlasnik_id : newFirma.vlasnik_id}
              onChange={editingFirma ? handleEditInputChange : handleInputChange}
              required
            >
              <option value="">Izaberite vlasnika</option>
              {vlasnici.map((vlasnik) => (
                <option key={vlasnik.id} value={vlasnik.id}>
                  {vlasnik.ime} {vlasnik.prezime}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="PIB"
              placeholder="PIB"
              value={editingFirma ? editingFirma.PIB : newFirma.PIB}
              onChange={editingFirma ? handleEditInputChange : handleInputChange}
              required
            />
            <input
              type="text"
              name="logo"
              placeholder="Logo URL"
              value={editingFirma ? editingFirma.logo : newFirma.logo}
              onChange={editingFirma ? handleEditInputChange : handleInputChange}
              required
            />
            <button type="submit">{editingFirma ? "Izmeni" : "Dodaj"} Firmu</button>
          </form>
          <table className="firme-table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Adresa</th>
                <th>Vlasnik</th>
                <th>PIB</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {filteredFirme.map((firma) => (
                <Firma key={firma.id} firma={firma} onEdit={setEditingFirma} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Firme;
