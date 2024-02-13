// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { Link } from 'react-router-dom'; // Corrected import statement
import '../styles/homepage.css';

const HomePage = ({ cryptoList }) => {
  // Using the useCrypto hook to access cryptoData and setCryptoData
  const { cryptoData, setCryptoData, isLoading, setIsLoading, error, setError } = useCrypto();

  // Fetch data only if cryptoData is empty to avoid unnecessary API calls
  useEffect(() => {
    if (!cryptoData.length) {
      setIsLoading(true);
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
          setCryptoData(data); // Update the context state
          setIsLoading(false);
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [cryptoData.length, setCryptoData, setIsLoading, setError]); // Corrected dependencies array

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="home-content">
      <h1>Cryptocurrency Market</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map(coin => (
            <tr key={coin.id}>
              <td><Link to={`/crypto/${coin.id}`}>{coin.name}</Link></td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
