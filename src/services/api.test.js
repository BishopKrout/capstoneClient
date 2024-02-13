import axios from 'axios';
import { login, fetchCryptoData, fetchUserData } from './api';

jest.mock('axios');

describe('API Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should log in a user and store the token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const token = 'testToken';

      const response = {
        data: {
          token: token
        }
      };

      axios.post.mockResolvedValue(response);

      const localStorageSpy = jest.spyOn(localStorage, 'setItem');

      const result = await login(email, password);

      expect(axios.post).toHaveBeenCalledWith('/api/auth/login', { email, password });
      expect(localStorageSpy).toHaveBeenCalledWith('token', token);
      expect(result).toEqual(response.data);
    });

    it('should throw an error if login fails', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const error = new Error('Login failed');

      axios.post.mockRejectedValue(error);

      await expect(login(email, password)).rejects.toThrow(error);
      expect(axios.post).toHaveBeenCalledWith('/api/auth/login', { email, password });
    });
  });

  describe('fetchCryptoData', () => {
    it('should fetch crypto data with the provided token', async () => {
      const token = 'testToken';
      const responseData = { /* mock response data */ };

      const response = {
        data: responseData
      };

      axios.get.mockResolvedValue(response);

      const result = await fetchCryptoData(token);

      expect(axios.get).toHaveBeenCalledWith('/api/crypto/markets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      expect(result).toEqual(responseData);
    });

    it('should throw an error if fetching crypto data fails', async () => {
      const token = 'testToken';
      const error = new Error('Failed to fetch crypto data');

      axios.get.mockRejectedValue(error);

      await expect(fetchCryptoData(token)).rejects.toThrow(error);
      expect(axios.get).toHaveBeenCalledWith('/api/crypto/markets', {
        headers: { Authorization: `Bearer ${token}` }
      });
    });
  });

  describe('fetchUserData', () => {
    it('should fetch user data with the provided userId and token', async () => {
      const userId = 'testUserId';
      const token = 'testToken';
      const responseData = { /* mock response data */ };

      const response = {
        data: responseData
      };

      axios.get.mockResolvedValue(response);

      const result = await fetchUserData(userId, token);

      expect(axios.get).toHaveBeenCalledWith(`/api/user/data/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      expect(result).toEqual(responseData);
    });

    it('should throw an error if fetching user data fails', async () => {
      const userId = 'testUserId';
      const token = 'testToken';
      const error = new Error('Failed to fetch user data');

      axios.get.mockRejectedValue(error);

      await expect(fetchUserData(userId, token)).rejects.toThrow(error);
      expect(axios.get).toHaveBeenCalledWith(`/api/user/data/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    });
  });
});