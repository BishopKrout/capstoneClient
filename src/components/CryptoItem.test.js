// src/__tests__/CryptoItemTest.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CryptoItem from './CryptoItem';

// No need for axios or axios-mock-adapter since the component doesn't make API calls.

test('renders crypto name and price', () => {
  const crypto = {
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 50000,
  };

  render(<CryptoItem crypto={crypto} />);

  const nameElement = screen.getByText(/Bitcoin/i);
  const symbolElement = screen.getByText(/BTC/i);
  const priceElement = screen.getByText(/\$50000/i);

  expect(nameElement).toBeInTheDocument();
  expect(symbolElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});
