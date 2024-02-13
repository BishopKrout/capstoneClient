// src/components/CryptoItem.js
import React from 'react';
import '../styles/CryptoItem.css'; 
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
mock.onGet('/api/crypto/markets').reply(200, {
  data: [{ id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' }],
});

const CryptoItem = ({ crypto }) => {
  return (
    <li className="crypto-item">
      <span className="crypto-name">{crypto.name} ({crypto.symbol.toUpperCase()})</span>
      <span className="crypto-price">${crypto.current_price}</span>
    </li>
  );
};

export default CryptoItem;
