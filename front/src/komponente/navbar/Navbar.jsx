import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

function Navbar({ token, user, handleLogout }) {
  let navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Pocetna</Link>
        </li>
        {!token ? (
          <>
            <li className="navbar-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/registration">Registracija</Link>
            </li>
            <li className="navbar-item">
              <Link to="/stocks">Stocks</Link>
            </li>
          </>
        ) : (
          <>
            {user?.uloga === 'admin' && (
              <>
                <li className="navbar-item">
                  <Link to="/firme">Firme</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/statistike">Statistike</Link>
                </li>
              </>
            )}
            {user?.uloga === 'vlasnik' && (
              <li className="navbar-item">
                <Link to="/vlasnik">Vlasnik</Link>
              </li>
            )}
            {user?.uloga === 'zaposleni' && (
              <li className="navbar-item">
                <Link to="/fileupload">File Upload</Link>
              </li>
            )}
            <li className="navbar-item">
              <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
