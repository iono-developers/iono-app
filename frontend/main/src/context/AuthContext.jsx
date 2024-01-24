/**
 * AuthProvider Component:
 * 
 * This component serves as a provider for authentication-related functionality
 * in a React application. It utilizes the Context API to manage and share
 * authentication state and functions throughout the app.
 * 
 * Useful for:
 * - Handling user authentication, including login, logout, and token refreshing.
 * - Providing the authenticated user's information and authentication tokens to
 *   components that require them.
 * - Automatically refreshing the authentication token at regular intervals to
 *   maintain user sessions.
 * 
 * When to use:
 * - Integrate this AuthProvider at the top level of your React application to
 *   manage user authentication across components.
 * - Ideal for applications with protected routes, user-specific content, and
 *   the need for seamless token refresh.
 * 
 * Function Usage Comments:
 * - loginUser: Handles user login by sending a POST request with provided
 *   credentials. Updates state and local storage on successful login.
 * - logoutUser: Logs out the user by clearing authentication tokens from state
 *   and local storage. Navigates to the login page.
 * - updateToken: Performs token refresh by sending a POST request with the
 *   refresh token. Updates state and local storage on success, otherwise logs out the user.
 * - useEffect: Triggers token refresh on component mount and sets up an interval
 *   to refresh the token every four minutes.
 * 
 */

import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    getAuthTokens,
    getUserAuthToken,
    getIdAuthToken,
    saveAuthTokens,
    removeAuthTokens
}

from '../utils/authentication';


const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    // State for authentication tokens: Retrieve authTokens from local storage if available
    const [authTokens, setAuthTokens] = useState(() => getAuthTokens());
    // State for username data: From the authTokens obtain the username if available
    const [username, setUsername] = useState(() => getUserAuthToken(authTokens?.access));
    // State for user_id data: From the authTokens obtain the user_id if available
    const [user_id, setUserId] = useState(() => getIdAuthToken(authTokens?.access));
    // State for loading status
    const [loading, setLoading] = useState(true);
    // React Router navigate function
    const navigate = useNavigate();

    // Function to handle user login using Axios
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const { status, data } = await axios.post("/auth/token/", {
                'username': e.target.username.value,
                'password': e.target.password.value
            });

            // Successful Login
            if (status === 200) {
                setAuthTokens(data);
                setUserId(getIdAuthToken(data.access));
                setUsername(getUserAuthToken(data.access));
                saveAuthTokens(data);
                navigate('/');
            } else {
                // Handle login failure
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Something went wrong!');
        }
    };

    // Function to log out the user
    const logoutUser = () => {
        setAuthTokens(null);
        setUserId(null)
        setUsername(null);
        removeAuthTokens();
        navigate('/login');
    };

    // Function to update authentication token using Axios
    const updateToken = async () => {
        try {
            const response = await axios.post("/auth/token/refresh/", {
                'refresh': authTokens?.refresh
            });

            const { status, data } = response;
            
            // User has the correct Token, we can update it
            if (status === 200) {
                setAuthTokens(data);
                setUserId(getIdAuthToken(data.access))
                setUsername(getUserAuthToken(data.access));
                saveAuthTokens(data);
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error('Token refresh error:', error);
            logoutUser();
        } finally {
            setLoading(false);
        }
    };

    // Context data object to be provided to consumers
    const contextData = {
        user_id,
        username,
        authTokens,
        loginUser,
        logoutUser,
    };

    // Effect to trigger token refresh on component mount and set up refresh interval
    useEffect(() => {

        const tokenRefreshDuration = 1000 * 60 * 4;

        if (loading) {
            updateToken();
        }

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, tokenRefreshDuration);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);

    }, [authTokens, loading]);

    // Render the AuthContext.Provider with the contextData
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
