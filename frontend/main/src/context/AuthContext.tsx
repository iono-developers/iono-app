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

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { 
    getAuthTokens,
    getUserAuthToken,
    getIdAuthToken,
    saveAuthTokens,
    removeAuthTokens 
} from '../utils/authentication';

// Define the shape of the authentication tokens received from the server
interface AuthTokens {
    access?: string;
    refresh?: string;
}

// Define the shape of the login response from the server
interface LoginResponse {
    access: string;
    refresh: string;
}

// Define the shape of the token refresh response from the server
interface TokenRefreshResponse {
    access: string;
}

// Define the shape of the authentication context data
export interface AuthContextData {
    user_id: string | null;
    username: string | null;
    authTokens: AuthTokens | null;
    loginUser: (username: string, password: string) => Promise<void>;
    logoutUser: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Custom hook to access the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component to manage authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State for authentication tokens: Retrieve authTokens from local storage if available
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => getAuthTokens());
    // State for username: Derived from authTokens if available
    const [username, setUsername] = useState<string | null>(() => authTokens?.access ? getUserAuthToken(authTokens.access) : null);
    // State for user ID: Derived from authTokens if available
    const [user_id, setUserId] = useState<string | null>(() => authTokens?.access ? getIdAuthToken(authTokens.access) : null);
    // State for loading status
    const [loading, setLoading] = useState(true);
    // React Router history hook for navigation
    const history = useHistory();

    // Function to handle user login
    const loginUser = async (username: string, password: string) => {
        try {
            const { status, data }: { status: number; data: LoginResponse } = await axios.post("/auth/token/", {
                username,
                password
            });

            if (status === 200) {
                setAuthTokens(data);
                setUserId(getIdAuthToken(data.access));
                setUsername(getUserAuthToken(data.access));
                saveAuthTokens(data);
                history.push('/events/');
            } else {
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
        setUserId(null);
        setUsername(null);
        removeAuthTokens();
        history.push('/login');
    };

    // Function to update authentication token using Axios
    const updateToken = async () => {
        try {
            const response = await axios.post("/auth/token/refresh/", {
                'refresh': authTokens?.refresh
            });

            const { status, data }: { status: number; data: TokenRefreshResponse } = response;

            if (status === 200) {
                setAuthTokens(data);
                setUserId(getIdAuthToken(data.access));
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

    // Effect to trigger token refresh on component mount and set up refresh interval
    useEffect(() => {
        const tokenRefreshDuration = 1000 * 60 * 4;

        if (loading) {
            updateToken();
        }

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, tokenRefreshDuration);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);

    }, [authTokens, loading]);

    // Context data object to be provided to consumers
    const contextData: AuthContextData = {
        user_id,
        username,
        authTokens,
        loginUser,
        logoutUser,
    };

    // Render the AuthContext.Provider with the contextData
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};