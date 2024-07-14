import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vlasnik.css';

const Vlasnik = () => {
  const [firme, setFirme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zaposleni, setZaposleni] = useState([]);
  const [selectedFirma, setSelectedFirma] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUser, setNewUser] = useState({
    ime: '',
    prezime: '',
    email: '',
    password: 'password', // Default password for new users
    uloga: 'zaposleni',
  });
  const [newZaposleni, setNewZaposleni] = useState({
    korisnik_id: '',
    pozicija: '',
    datum_pocetka: '',
  });

  useEffect(() => {
    const fetchFirme = async () => {
      const token = sessionStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user'));

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/firme/vlasnik/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFirme(response.data.firme);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirme();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vlasnici`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users); // Update to match response data structure
      } catch (err) {
        setError(err);
      }
    };

    fetchUsers();
  }, []);

  const fetchZaposleni = async (firmaId) => {
    const token = sessionStorage.getItem('token');

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/firma/${firmaId}/zaposleni`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setZaposleni(response.data.users);
      console.log(response.data.users)
      setSelectedFirma(firmaId);
    } catch (err) {
      setError(err);
    }
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
    setNewZaposleni((prevState) => ({
      ...prevState,
      korisnik_id: e.target.value,
    }));
  };

  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddZaposleni = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    if (selectedUser === 'new') {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNewZaposleni((prevState) => ({
          ...prevState,
          korisnik_id: response.data.user.id,
        }));
        setNewUser({
          ime: '',
          prezime: '',
          email: '',
          password: 'password',
          uloga: 'zaposleni',
        });
        setSelectedUser('');
      } catch (err) {
        setError(err);
        return;
      }
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/radi', {
        ...newZaposleni,
        firma_id: selectedFirma,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setZaposleni((prevState) => [...prevState, response.data.radi]);
      setNewZaposleni({
        korisnik_id: '',
        pozicija: '',
        datum_pocetka: '',
      });

      // Ponovo učitaj zaposlenike za odabranu firmu
      fetchZaposleni(selectedFirma);
    } catch (err) {
      setError(err);
    }
  };

  const handleDeleteZaposleni = async (korisnik_id) => {
    const token = sessionStorage.getItem('token');

    try {
      await axios.delete(`http://127.0.0.1:8000/api/firma/${selectedFirma}/zaposleni/${korisnik_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ponovo učitaj zaposlenike za odabranu firmu
      fetchZaposleni(selectedFirma);
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading firms: {error.message}</p>;

  return (
    <div className="vlasnik-container">
      <h1>Firme</h1>
      <div className="firme-grid">
        {firme.map((firma) => (
          <div key={firma.id} className="firma-card" onClick={() => fetchZaposleni(firma.id)}>
            <h2>{firma.naziv}</h2>
          </div>
        ))}
      </div>
      {selectedFirma && (
        <form onSubmit={handleAddZaposleni} className="add-zaposleni-form">
          <h3>Dodaj Zaposlenog</h3>
          <select value={selectedUser} onChange={handleUserSelect}>
            <option value="">Izaberite korisnika</option>
            {users && users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.ime} {user.prezime} - {user.email}
              </option>
            ))}
            <option value="new">Novi korisnik</option>
          </select>
          {selectedUser === 'new' && (
            <>
              <input
                type="text"
                name="ime"
                placeholder="Ime"
                value={newUser.ime}
                onChange={handleNewUserInputChange}
                required
              />
              <input
                type="text"
                name="prezime"
                placeholder="Prezime"
                value={newUser.prezime}
                onChange={handleNewUserInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleNewUserInputChange}
                required
              />
            </>
          )}
          <input
            type="text"
            name="pozicija"
            placeholder="Pozicija"
            value={newZaposleni.pozicija}
            onChange={(e) => setNewZaposleni((prevState) => ({
              ...prevState,
              pozicija: e.target.value,
            }))}
            required
          />
          <input
            type="date"
            name="datum_pocetka"
            placeholder="Datum početka"
            value={newZaposleni.datum_pocetka}
            onChange={(e) => setNewZaposleni((prevState) => ({
              ...prevState,
              datum_pocetka: e.target.value,
            }))}
            required
          />
          <button type="submit">Dodaj</button>
        </form>
      )}
      <div className="zaposleni-container">
        {zaposleni && zaposleni.length > 0 && (
          <>
            <h2>Zaposleni</h2>
            <table className="zaposleni-table">
              <thead>
                <tr>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Email</th>
                  <th>Pozicija</th>
                  <th>Datum početka</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {zaposleni.map((zaposlen) => (
                  <tr key={zaposlen.id}>
                    <td>{zaposlen.ime}</td>
                    <td>{zaposlen.prezime}</td>
                    <td>{zaposlen.email}</td>
                    <td>{zaposlen.pozicija}</td>
                    <td>{zaposlen.datum_pocetka}</td>
                    <td>
                      <button onClick={() => handleDeleteZaposleni(zaposlen.id)}>Obriši</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Vlasnik;
