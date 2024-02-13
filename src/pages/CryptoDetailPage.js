// Location: client/src/pages/cryptodetail/CryptoDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/CryptoDetailPage.css';

const CryptoDetailPage = () => {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    // Fetch the individual cryptocurrency data and historical data
    const fetchData = async () => {
      const detailsResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      setCryptoDetails(detailsResponse.data);
      
      const historicalResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: { vs_currency: 'usd', days: 'max', interval: 'daily' }
      });
      setHistoricalData(historicalResponse.data.prices);
    };

    fetchData();
  }, [id]);

  return (
    <div className="card">
      <LineChart width={600} height={300} data={historicalData.map(item => ({ date: item[0], price: item[1] }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
      <div>
        <h2>{cryptoDetails?.name}</h2>
        <p>Price: ${cryptoDetails?.market_data?.current_price?.usd}</p>
        <p>Market Cap: ${cryptoDetails?.market_data?.market_cap?.usd.toLocaleString()}</p>
      </div>
    </div>
  );
  
};

export default CryptoDetailPage;
