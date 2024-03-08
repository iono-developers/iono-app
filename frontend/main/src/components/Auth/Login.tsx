import '../../styles/main.scss'
import './Login.scss'

import React from 'react';
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
      <div className="form-container"> {/* Added login-form class */}
        <h2 className='form-title'>Login</h2>
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