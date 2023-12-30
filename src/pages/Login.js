import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import logo from '../images/umpisa.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        // Check if the response contains a valid token
        if (data.token) {
          // Store the token in localStorage
          localStorage.setItem('token', data.token);
          // Redirect to the dashboard route on successful login
          navigate('/dashboard');
        } else {
          console.log('Token not found in the response.');
        }
      } else {
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="umpisa logo" className="login-logo" />
        <p className="login-subtitle">LOGIN TO CONTINUE</p>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
