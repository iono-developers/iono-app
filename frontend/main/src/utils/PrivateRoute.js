// PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

/**
 * PrivateRoute Component:
 * 
 * A wrapper component for rendering private routes. It checks if the user is
 * authenticated using the AuthContext. If authenticated, it renders the child
 * components defined in the Outlet. If not, it navigates to the login page.
 * 
 * @returns {JSX.Element} JSX element representing the PrivateRoute component
 */

const PrivateRoute = () => {
  // Access the user information from the AuthContext
  const { username } = useContext(AuthContext);

  // If authorized, return an outlet that will render child elements
  // If not, return an element that will navigate to the login page
  return username ? <Outlet /> : <Navigate to="/login" />;
}

// Export the PrivateRoute component for use in other files
export default PrivateRoute;
