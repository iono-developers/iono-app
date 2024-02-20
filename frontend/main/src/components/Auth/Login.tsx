/**
 * Login Component:
 * 
 * This component represents the login page of a React application, allowing users
 * to enter their username and password for authentication. It utilizes the
 * AuthContext to access the loginUser function, which handles the login process.
 * 
 * Useful for:
 * - Creating a user interface for user login within a React application.
 * - Utilizing the AuthContext to access authentication-related functionality.
 * - Collecting user input for username and password through a form.
 * 
 * When to use:
 * - Integrate this Login component into your application where user authentication
 *   is required, typically as part of the login page or authentication flow.
 * - Ideal for applications with user accounts and protected routes.
 * 
 * Function Usage Comments:
 * - useContext: Accesses the loginUser function from the AuthContext to handle
 *   the login process when the form is submitted.
 * - form onSubmit: Triggers the loginUser function when the form is submitted,
 *   allowing users to log in by providing their username and password.
 * 
 */

// Import the main.scss file
import '../../styles/main.scss'

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const { loginUser } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    const { username, password } = target;
    await loginUser(username.value, password.value);
  };

  return (
    <div className="container"> {/* Added container class */}
      <div className="login-form"> {/* Added login-form class */}
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group"> {/* Added form-group class */}
            <input className="login-input" type="text" name="username" placeholder="Enter Username" required />
          </div>
          <div className="form-group"> {/* Added form-group class */}
            <input className="login-input" type="password" name="password" placeholder="Enter Password" required />
          </div>
          <div className="form-group"> {/* Added form-group class */}
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;