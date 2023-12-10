// Login.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login, email: storedEmail, password: storedPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the provided email and password match the values from AuthContext
    if (email === storedEmail && password === storedPassword) {
      login(); // Fake login function from AuthContext

      toast.success('Login successful!'); // Toast success message
    } else {
      toast.error('Invalid email or password. Please try again.'); // Toast error message
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Log In
        </button>

        {/* Include the ToastContainer */}
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
