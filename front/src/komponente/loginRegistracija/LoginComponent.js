
import React, { useState } from 'react';
import axios from 'axios';
import './LoginComponent.css';
import InputField from './InputField';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      });
     
      sessionStorage.setItem('token', response.data.token);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Member Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <InputField 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <div className="login-footer">
          <a href="#forgot">Forgot Username / Password?</a>
          <a href="#signup">Create your Account →</a>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
