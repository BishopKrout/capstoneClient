// src/context/CryptoContext.test.js

import React from 'react';
import { render, act } from '@testing-library/react';
import { CryptoProvider, useCrypto } from './CryptoContext';

describe('CryptoContext', () => {
  test('should provide cryptoData, setCryptoData, isLoading, setIsLoading, error, and setError', () => {
    const TestComponent = () => {
      const { cryptoData, setCryptoData, isLoading, setIsLoading, error, setError } = useCrypto();

      // Assert that the values are initially set correctly
      expect(cryptoData).toEqual([]);
      expect(isLoading).toBe(false);
      expect(error).toBe(null);

      // Update the values
      act(() => {
        setCryptoData([{ id: 1, name: 'Bitcoin' }]);
        setIsLoading(true);
        setError('An error occurred');
      });

      // Assert that the values have been updated
      expect(cryptoData).toEqual([{ id: 1, name: 'Bitcoin' }]);
      expect(isLoading).toBe(true);
      expect(error).toBe('An error occurred');

      return null;
    };

    render(
      <CryptoProvider>
        <TestComponent />
      </CryptoProvider>
    );
  });
});