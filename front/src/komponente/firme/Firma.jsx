import React from 'react';
import './Firma.css';

const Firma = ({ firma }) => {
  return (
    <tr className="firma-row">
      {/* <td><img src={firma.logo} alt={`Logo za ${firma.naziv}`} /></td> */}
      <td>{firma.naziv}</td>
      <td>{firma.adresa}</td>
      <td>{firma.vlasnik.ime} {firma.vlasnik.prezime}</td>
      <td>{firma.PIB}</td>
    </tr>
  );
};

export default Firma;
