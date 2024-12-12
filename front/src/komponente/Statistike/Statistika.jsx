import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaUserTie, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Statistika.css'; // Dodajemo CSS fajl

const Statistika = () => {
  const [statistics, setStatistics] = useState({
    total_users: 0,
    percentage_owners: 0,
    percentage_employees: 0,
    total_files: 0,
    files_per_company: []
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/statistika');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const data = {
    labels: statistics.files_per_company.map(company => `Firma ${company.firma_id}`),
    datasets: [
      {
        label: 'Broj fajlova po firmi',
        data: statistics.files_per_company.map(company => company.total_files),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="statistics-container">
      <h2>Statistika</h2>
      <div className="cards-container">
        <div className="card">
          <FaUser size={50} />
          <h3>Ukupan broj korisnika</h3>
          <p>{statistics.total_users}</p>
        </div>
        <div className="card">
          <FaUserTie size={50} />
          <h3>Procenat vlasnika</h3>
          <p>{statistics.percentage_owners.toFixed(2)}%</p>
        </div>
        <div className="card">
          <FaUserFriends size={50} />
          <h3>Procenat zaposlenih</h3>
          <p>{statistics.percentage_employees.toFixed(2)}%</p>
        </div>
        <div className="card">
          <FaFileAlt size={50} />
          <h3>Ukupan broj fajlova</h3>
          <p>{statistics.total_files}</p>
        </div>
      </div>
      <div className="chart-container">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Statistika;
