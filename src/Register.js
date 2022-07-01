import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const registerUrl = 'https://wurqy7fi5m.execute-api.us-east-1.amazonaws.com/DevEnvironment/register';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '') {
      setMessage('All fields are required');
      return;
    }
    setMessage(null);
    const requestConfig = {
      headers: {
        'x-api-key': '3srg4rBXdYaztSL7Jq7jh4BNYLamcBsV3sDAXdsE'
      }
    }
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password
    }
    axios.post(registerUrl, requestBody, requestConfig).then(response => {
      setMessage('Registeration Successful');
    }).catch(error => {
      if (error.response.status === 401) {
        setMessage(error.response.data.message);
      } else {
        setMessage('sorry....the backend server is down!! please try again later');
      }
    })
  }

  return (
    <div className='login-body'>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        <div className='login-input'><TextField label="Name" variant="outlined" type="text" value={name} onChange={event => setName(event.target.value)} /></div>
        <div className='login-input'><TextField label="Email" variant="outlined" type="text" value={email} onChange={event => setEmail(event.target.value)} /></div>
        <div className='login-input'><TextField label="Username" variant="outlined" type="text" value={username} onChange={event => setUsername(event.target.value)} /></div>
        <div className='login-input'><TextField label="Password" variant="outlined" type="password" value={password} onChange={event => setPassword(event.target.value)} /></div>
        <Button variant="contained" type="submit">Register</Button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Register;