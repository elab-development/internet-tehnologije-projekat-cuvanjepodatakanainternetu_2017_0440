import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPrices = () => {
  const [stockPrices, setStockPrices] = useState([]);
  const apiKey = 'irvNlWP5UMn7uBeOhIwIsey9rehSVNoPOKj1v9Ez';  
  const companies = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'FB', name: 'Meta Platforms, Inc.' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' }, 
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
    { symbol: 'V', name: 'Visa Inc.' },
    { symbol: 'JNJ', name: 'Johnson & Johnson' },
    { symbol: 'NFLX', name: 'Netflix, Inc.' },
    { symbol: 'BAC', name: 'Bank of America Corporation' },
    { symbol: 'INTC', name: 'Intel Corporation' },
    { symbol: 'CSCO', name: 'Cisco Systems, Inc.' },
    { symbol: 'VZ', name: 'Verizon Communications Inc.' },
    { symbol: 'ADBE', name: 'Adobe Inc.' }, 
    { symbol: 'KO', name: 'The Coca-Cola Company' },
    { symbol: 'PG', name: 'Procter & Gamble Company' },
  ];
  

  useEffect(() => {
    companies.forEach(company => {
      const { symbol } = company;  
  
      axios.get(`https://api.api-ninjas.com/v1/stockprice?ticker=${symbol}`, {
        headers: { 'X-Api-Key': apiKey }
      })
      .then(response => {
        setStockPrices(prices => [...prices, response.data]);
      })
      .catch(error => console.error(`Error fetching stock price for ${symbol}:`, error));
    });
  }, []);
  

  return (
    <div className="firme-container">
      <table className="firme-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Price</th>
            <th>Exchange</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {stockPrices.map((stock, index) => (
            <tr key={index} className="firma-row">
              <td>{stock.ticker}</td>
              <td>{stock.name}</td>
              <td>${stock.price}</td>
              <td>{stock.exchange}</td>
              <td>{new Date(stock.updated * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockPrices;
