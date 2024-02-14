// Import the Axios library for making HTTP requests
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import BASE_URL from '../config';

// Define the base URL for the API
const API_BASE_URL: string = BASE_URL;

// Create an Axios instance with the base URL and default headers
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exporting utility functions for common HTTP methods: GET, POST, PUT, DELETE

/**
 * Sends a GET request to the specified URL.
 * @param {string} url - The endpoint URL.
 * @returns {Promise<AxiosResponse<T>>} - A Promise that resolves to the response data.
 */
export const get = <T>(url: string): Promise<AxiosResponse<T>> => api.get<T>(url);

/**
 * Sends a POST request to the specified URL with the provided data.
 * @param {string} url - The endpoint URL.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<AxiosResponse<T>>} - A Promise that resolves to the response data.
 */
export const post = <T>(url: string, data: any): Promise<AxiosResponse<T>> => api.post<T>(url, data);

/**
 * Sends a PUT request to the specified URL with the provided data.
 * @param {string} url - The endpoint URL.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<AxiosResponse<T>>} - A Promise that resolves to the response data.
 */
export const put = <T>(url: string, data: any): Promise<AxiosResponse<T>> => api.put<T>(url, data);

/**
 * Sends a DELETE request to the specified URL.
 * @param {string} url - The endpoint URL.
 * @returns {Promise<AxiosResponse<T>>} - A Promise that resolves to the response data.
 */
export const del = <T>(url: string): Promise<AxiosResponse<T>> => api.delete<T>(url);
