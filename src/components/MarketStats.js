// src/components/MarketStats.js
import React from 'react';
import '../styles/marketStats.css'; 

const MarketStats = ({ stats }) => {
    return (
        <div className="market-stats">
            {stats.map(stat => (
                <div className="stat-card" key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.value}</p>
                </div>
            ))}
        </div>
    );
}; 

export default MarketStats;
