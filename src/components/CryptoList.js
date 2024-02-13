// src/components/CryptoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoItem from './CryptoItem';

function CryptoList() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      setCryptos(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Cryptocurrency List</h2>
      <ul>
        {cryptos.map(crypto => (
          <CryptoItem key={crypto.id} crypto={crypto} />
        ))}
      </ul>
    </div>
  );
}

export default CryptoList;
