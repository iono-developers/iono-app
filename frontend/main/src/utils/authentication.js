// authentication.js

import { jwtDecode } from "jwt-decode";


/**
 * getAuthTokens Function:
 * 
 * Retrieves authentication tokens from local storage, parses the JSON, and returns them.
 * Returns null if authentication tokens are not present in local storage.
 * 
 * @returns {Object|null} Parsed authentication tokens or null
 */

const getAuthTokens = () => {
    // Check if authentication tokens are present in local storage
    const authTokensString = localStorage.getItem('authTokens');

    // Parse and return authentication tokens or null
    return authTokensString ? JSON.parse(authTokensString) : null;
};

/**
 * Function to obtain user data from a token
 * @param {string} access_token - Authentication token
 * @returns {string|null} - User data or null if token is not present
 */
const getUserAuthToken = (access_token) => {
    return access_token ? jwtDecode(access_token).username : null;
};

/**
* Function to set authentication tokens in local storage
* @param {object} data - Authentication tokens data to be stored
*/
const saveAuthTokens = (data) => {
    localStorage.setItem('authTokens', JSON.stringify(data));
};

/**
 * Function to remove authentication tokens from local storage
 */
const removeAuthTokens = () => {
    localStorage.removeItem('authTokens');
};

/**
 * Function to obtain user id from a token
 * @param {string} access_token - Authentication token
 * @returns {string|null} - User data or null if token is not present
 */
const getIdAuthToken = (access_token) => {
    return access_token ? jwtDecode(access_token).user_id : null;
}

// Export the getAuthTokens function for use in other files
export { getAuthTokens, getUserAuthToken, getIdAuthToken, saveAuthTokens, removeAuthTokens };
