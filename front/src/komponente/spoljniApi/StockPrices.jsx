import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockRow from './StockRow';
import ReactPaginate from 'react-paginate';
const StockPrices = () => {
  const [stockPrices, setStockPrices] = useState([]);
  const apiKey = 'zM19eZg0Jr4RhQVLUhaTPNinI23m3tFsZDzzZD1M';  
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
  const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage =5;
    const [searchQuery, setSearchQuery] = useState('');
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
  

  //za pretragu
  const filteredStockPrices = stockPrices.filter(stock => 
    (stock.name && stock.ticker) &&  
    (
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  //za paginaciju
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const displayedStockPrices = filteredStockPrices.slice(startIndex, endIndex);
  return (
    <div className="firme-container">
            <input
            type="text"
            placeholder="Search by ticker or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
        />
        <ReactPaginate
            pageCount={Math.ceil(displayedStockPrices.length / itemsPerPage)}
            pageRangeDisplayed={5} // Broj prikazanih stranica u paginaciji
            marginPagesDisplayed={2} // Broj stranica koje će biti prikazane pre i posle trenutne stranice
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName={'pagination'}
            activeClassName={'active'}
            />
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
          {displayedStockPrices.map((stock, index) => (
           <StockRow
                key={index}
                ticker={stock.ticker}
                name={stock.name}
                price={stock.price}
                exchange={stock.exchange}
                updated={stock.updated}
         />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockPrices;
