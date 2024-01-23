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