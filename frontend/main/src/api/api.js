// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post('token/', { username, password });
    return response.data.access;
  } catch (error) {
    throw error.response.data;
  }
};
