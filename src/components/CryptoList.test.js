// src/__tests__/CryptoListTest.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CryptoList from './CryptoList';
import axios from 'axios';

jest.mock('axios');

test('renders cryptocurrency list', async () => {
  const mockCryptos = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 50000 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3000 },
  ];

  axios.get.mockResolvedValue({ data: mockCryptos });

  render(<CryptoList />);

  await waitFor(() => {
    const bitcoinElement = screen.getByText(/Bitcoin/i);
    const ethereumElement = screen.getByText(/Ethereum/i);

    expect(bitcoinElement).toBeInTheDocument();
    expect(ethereumElement).toBeInTheDocument();
  });
});
