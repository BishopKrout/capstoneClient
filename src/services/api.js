import axios from 'axios';

const API_URL = '/api';

// Function to handle login
export const login = async (email, password) => {
    console.log('Attempting to log in', { email, password });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token); // Store the token
      console.log('Stored token:', response.data.token);
      console.log('Login response', response.data); // Log the response
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  

export const fetchCryptoData = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/crypto/markets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw error;
    }
  };

export const fetchUserData = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/user/data/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};


