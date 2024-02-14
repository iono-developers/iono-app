import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  // You can add other props if needed
}

/**
 * PrivateRoute Component:
 * 
 * A wrapper component for rendering private routes. It checks if the user is
 * authenticated using the AuthContext. If authenticated, it renders the child
 * components defined in the Outlet. If not, it redirects to the login page.
 * 
 * @returns {JSX.Element} JSX element representing the PrivateRoute component
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Access the user information from the AuthContext
  const { username } = useAuth();

  // If authorized, return the children to render
  // If not, redirect to the login page
  return username ? <>{children}</> : <Redirect to="/login" />;
}

export default PrivateRoute;
