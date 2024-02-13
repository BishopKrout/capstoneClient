// src/__tests__/CryptoDetailPageTest.js
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import CryptoDetailPage from '../../../newclient/src/components/CryptoDetailPage';
import axios from 'axios';
import { useParams } from 'react-router-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: jest.fn(),
}));

test('renders crypto details', async () => {
  useParams.mockReturnValue({ id: 'bitcoin' });
  const cryptoDetails = { /* mock crypto details response */ };
  const historicalData = { /* mock historical data response */ };

  // Mock Axios calls
  axios.get.mockImplementation(url => {
    if (url.includes('/coins/bitcoin')) {
      return Promise.resolve({ data: cryptoDetails });
    } else if (url.includes('/coins/bitcoin/market_chart')) {
      return Promise.resolve({ data: historicalData });
    }
  });

  render(<CryptoDetailPage />);

  // Assertions...
});
