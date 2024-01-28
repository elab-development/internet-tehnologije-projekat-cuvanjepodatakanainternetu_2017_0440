
import React, { useState } from 'react';
import axios from 'axios';
import './LoginComponent.css';

const InputField = ({ type, name, placeholder, value, onChange }) => (
  <div className="input-group">
    <input 
      type={type} 
      name={name} 
      id={name} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      required 
    />
  </div>
);

const RegistrationComponent = () => {
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        ime,
        prezime,
        email,
        password,
        uloga: 'korisnik'  
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Member Registration</h2>
        <form onSubmit={handleSubmit}>
          <InputField 
            type="text" 
            name="ime" 
            placeholder="Ime" 
            value={ime} 
            onChange={(e) => setIme(e.target.value)} 
          />
          <InputField 
            type="text" 
            name="prezime" 
            placeholder="Prezime" 
            value={prezime} 
            onChange={(e) => setPrezime(e.target.value)} 
          />
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
          <button type="submit" className="login-button">Register</button>
        </form>
        <div className="login-footer">
          <a href="/login">Already have an account? Log in →</a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComponent;
