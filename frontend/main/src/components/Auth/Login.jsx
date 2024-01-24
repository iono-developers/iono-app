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


import React, { useContext } from 'react'

import AuthContext from '../../context/AuthContext'


const Login = () => {
  let { loginUser } = useContext(AuthContext)
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login