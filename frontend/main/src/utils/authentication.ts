import { jwtDecode, JwtPayload } from "jwt-decode";

// Define an interface representing the decoded JWT payload structure
interface DecodedToken extends JwtPayload {
  username?: string;
  user_id?: string;
  authTokens?: string;
}

/**
 * getAuthTokens Function:
 * 
 * Retrieves authentication tokens from local storage, parses the JSON, and returns them.
 * Returns null if authentication tokens are not present in local storage.
 * 
 * @returns {Object|null} Parsed authentication tokens or null
 */
const getAuthTokens = (): object | null => {
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
const getUserAuthToken = (access_token: string): string | null => {
    const decodedToken = access_token ? jwtDecode(access_token) as DecodedToken : null;
    return decodedToken && decodedToken.username ? decodedToken.username : null;
};

/**
 * Function to set authentication tokens in local storage
 * @param {object} data - Authentication tokens data to be stored
 */
const saveAuthTokens = (data: object): void => {
    localStorage.setItem('authTokens', JSON.stringify(data));
};

/**
 * Function to remove authentication tokens from local storage
 */
const removeAuthTokens = (): void => {
    localStorage.removeItem('authTokens');
};

/**
 * Function to obtain user id from a token
 * @param {string} access_token - Authentication token
 * @returns {string|null} - User data or null if token is not present
 */
const getIdAuthToken = (access_token: string): string | null => {
    const decodedToken = access_token ? jwtDecode(access_token) as DecodedToken : null;
    return decodedToken && decodedToken.user_id ? decodedToken.user_id : null;
}

// Export the functions for use in other files
export { getAuthTokens, getUserAuthToken, getIdAuthToken, saveAuthTokens, removeAuthTokens };
