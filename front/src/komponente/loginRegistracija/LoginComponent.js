import React, { useState } from 'react';
import axios from 'axios';
import './LoginComponent.css';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ onLogin }) => {
  const [email, setEmail] = useState('sedrick59@example.net');
  const [password, setPassword] = useState('password');
  let navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      });
     
      const { token, user } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      onLogin(token, user);

      // Preusmeravanje na osnovu uloge korisnika
      if (user.uloga == 'admin') {
        navigate('/firme');
      } else if (user.uloga == 'vlasnik') {
        navigate('/vlasnik');
      } else if (user.uloga == 'zaposleni') {
        navigate('/fileupload');
      } else {
        navigate('/');
      }
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
          <a href="/registration">Create your Account →</a>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
