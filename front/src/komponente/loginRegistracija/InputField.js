
import React, { useState } from 'react';
const InputField = ({ type, name, value, placeholder, onChange }) => (
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


  export default InputField;