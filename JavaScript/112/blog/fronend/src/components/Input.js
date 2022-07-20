import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillLockFill } from 'react-icons/bs';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import './Input.css';

function Input({name, label, value, onChange, type, minlength, icon}) {
  return (
    <div className="text_field">
      <input 
        placeholder=" " 
        name={name}
        onChange={onChange}
        value={value} 
        required 
        id={name} 
        minLength={minlength || 3}
        type={type || 'text'}
      />
      <span></span>
      <label htmlFor="first">
        {icon === 'person' ? <BsFillPersonFill /> : ''}
        {icon === 'lock' ? <BsFillLockFill /> : ''}
        {icon === 'email' ? <BsFillEnvelopeFill /> : ''}
        {label}
      </label>
    </div>
  )
}

export default Input