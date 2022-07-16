import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import useForms from '../hooks/useForm';
import Input from '../components/Input';
import { useUser, useUpdateUser } from '../AppContext';
import './Login.css';
import { SERVER_PORT } from '../constants';

export default function Login({ theMethod }) {
  const navigate = useNavigate();
  const user = useUser();
  const updateUser = useUpdateUser()
  const [ method, setMethod ] = useState(theMethod || 'login') ;
  const [ formData, setFormData ] = useForms({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    if(user && user.authenticated) {
      navigate("/", { replace: true });
    }
  });

  const submit = async (e) => {
    console.log('login');
    e.preventDefault();
    const userDetails = {
      method: method,
      email: formData.email,
      password: formData.password
    };

    if(method === 'signup') {
      userDetails.firstName = formData.firstName;
      userDetails.lastName = formData.lastName;
    }
    
    const response = await fetch(`http://localhost:${SERVER_PORT}/login`, {
      method: "POST",
      credentials: "include",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails)
    })
    if(response.ok) {
      const theUser = await response.json()
      updateUser(theUser);
      console.log('done');
      navigate("/", { replace: true });
    } else {
      const theText = await response.text();
      alert(theText);
    }
  }

  const changeMethod = () => {
    setMethod(method === 'login' ? 'signup' : 'login');
  }

  return (
    <main>
      <div className="center">
        <h1 className='formTitle'>{method === 'login' ? 'Login' : 'Sign up'}</h1>
        <form autoComplete="off" onSubmit={submit}>
          {method === 'signup' && (
            <div className="firstLastName">
              <Input 
                name="firstName" 
                label="First name" 
                value={formData.firstName} 
                onChange={setFormData} 
                icon="person"
              />
              <Input 
                name="lastName" 
                label="Last Name" 
                value={formData.lastName} 
                onChange={setFormData} 
                icon="person"
              />
            </div>
          )}
          <Input 
            name="email" 
            label="Email" 
            value={formData.email} 
            onChange={setFormData}
            icon={'email'}
            type="email"
          />
          <Input 
            name="password" 
            label="Password" 
            value={formData.password} 
            onChange={setFormData} 
            type="password"
            icon={'lock'}
            minlength="5"
          />
          <input type="submit" value={method === 'login' ? 'Login': 'Sign up'} />
          <div className="signup">
            <span>{method === 'login' ? 'not': 'already'} a member? </span>
            {/* <button type="button" onClick={changeMethod} className="link-primary">
              {method === 'login' ? 'Sign up' : 'Login'}
            </button> */}
            <NavLink onClick={changeMethod} to={`/${method === 'login' ? 'signup' : 'login'}`}>
              {method === 'login' ? 'Sign up' : 'Login'}
            </NavLink>
          </div>
        </form>
      </div>
    </main>
  )
}