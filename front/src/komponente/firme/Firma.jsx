import React from 'react';
import './Firma.css';

const Firma = ({ firma, onEdit, onDelete }) => {
  return (
    <tr className="firma-row">
      <td>{firma.naziv}</td>
      <td>{firma.adresa}</td>
      <td>{firma.vlasnik.ime} {firma.vlasnik.prezime}</td>
      <td>{firma.PIB}</td>
      <td>
        <button onClick={() => onEdit(firma)}>Izmeni</button>
        <button onClick={() => onDelete(firma.id)}>Obriši</button>
      </td>
    </tr>
  );
};

export default Firma;
