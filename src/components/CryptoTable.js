// src/components/CryptoTable.js
import React from 'react';
import '../styles/cryptoTable.css';

const CryptoTable = ({ cryptoData }) => {
    return (
        <table className="crypto-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                {cryptoData.map(coin => (
                    <tr key={coin.id}>
                        <td>{coin.name}</td>
                        <td>{coin.symbol.toUpperCase()}</td>
                        <td>${coin.current_price}</td>
                        <td>${coin.market_cap.toLocaleString()}</td>
                        <td>${coin.total_volume.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CryptoTable;
