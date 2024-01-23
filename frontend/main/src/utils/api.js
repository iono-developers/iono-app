// /src/utils/api.js

// Import the Axios library for making HTTP requests
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:8000';

// Create an Axios instance with the base URL and default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exporting utility functions for common HTTP methods: GET, POST, PUT, DELETE

/**
 * Sends a GET request to the specified URL.
 * @param {string} url - The endpoint URL.
 * @returns {Promise} - A Promise that resolves to the response data.
 */
export const get = (url) => api.get(url);

/**
 * Sends a POST request to the specified URL with the provided data.
 * @param {string} url - The endpoint URL.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise} - A Promise that resolves to the response data.
 */
export const post = (url, data) => api.post(url, data);

/**
 * Sends a PUT request to the specified URL with the provided data.
 * @param {string} url - The endpoint URL.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise} - A Promise that resolves to the response data.
 */
export const put = (url, data) => api.put(url, data);

/**
 * Sends a DELETE request to the specified URL.
 * @param {string} url - The endpoint URL.
 * @returns {Promise} - A Promise that resolves to the response data.
 */
export const del = (url) => api.delete(url);
