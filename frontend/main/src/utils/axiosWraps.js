// axiosAuth.js

import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'; // Update the path based on your project structure

/**
 * axiosAuth Axios Instance:
 * 
 * An Axios instance configured with default settings and an interceptor to
 * automatically include authentication tokens in the headers of each request.
 * 
 * @type {AxiosInstance} Axios instance with authentication headers
 */

// Create an Axios instance with default configuration
const axiosAuth = axios.create();

// Add an interceptor to automatically include the authentication tokens in the headers
axiosAuth.interceptors.request.use((config) => {
    // Retrieve authentication tokens using the AuthContext
    const { authTokens } = useContext(AuthContext);

    // If authentication tokens are present, include them in the request headers
    if (authTokens) {
        config.headers.Authorization = `Bearer ${authTokens.access}`;
    }

    // Return the modified config
    return config;
});

// Export the axiosAuth instance for use in other files
export default { axiosAuth };
