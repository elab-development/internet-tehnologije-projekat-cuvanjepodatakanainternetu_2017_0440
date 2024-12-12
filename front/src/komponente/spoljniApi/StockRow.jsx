import React from 'react';

const StockRow = ({ ticker, name, price, exchange, updated }) => {
  return (
    <tr className="firma-row">
      <td>{ticker}</td>
      <td>{name}</td>
      <td>${price}</td>
      <td>{exchange}</td>
      <td>{new Date(updated * 1000).toLocaleString()}</td>
    </tr>
  );
};

export default StockRow;
