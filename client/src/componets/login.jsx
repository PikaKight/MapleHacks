import React from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './login.css'

export default function login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
  const navigate = useNavigate();


    const redirectSignup = () => {
      navigate('/signup')
  }

  const handleSubmit = (event) => {
    event.preventDefault

    let body = {
      username: username,
      password: password
    }

    let request = new Request('http://127.0.0.1:8000/login', {
      method: "POST",
      mode: "no-cors",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    })

    fetch(request)
    navigate('/homeauth')

  }


  return (
    <div className='Login'>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>
                Username: 
                <input 
                  type='text' 
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
          </label>
          <label>
                Password: 
                <input 
                  type='text' 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
          </label>
          <input type='submit' value="Login"/>
        </form>
        <button onClick={redirectSignup}>Sign Up</button>
      </div>
    </div>
  )
}
