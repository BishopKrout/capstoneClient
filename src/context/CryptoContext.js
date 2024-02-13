// src/context/CryptoContext.js

import React, { createContext, useState, useContext } from 'react';

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <CryptoContext.Provider value={{ cryptoData, setCryptoData, isLoading, setIsLoading, error, setError }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);


