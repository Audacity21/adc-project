import React, {useState} from 'react';
import axios from 'axios';
import { setUserSession } from './service/AuthService'
import { TextField, Button } from '@material-ui/core';
const loginAPIUrl = 'https://wurqy7fi5m.execute-api.us-east-1.amazonaws.com/DevEnvironment/login';


const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password are required');
      return;
    }
    setErrorMessage(null);
    const requestConfig = {
      headers: {
        'x-api-key': '3srg4rBXdYaztSL7Jq7jh4BNYLamcBsV3sDAXdsE'
      }
    }
    const requestBody = {
      username: username,
      password: password
    }

    axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
      setUserSession(response.data.user, response.data.token);
      props.history.push('/dashboard');
    }).catch((error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('sorry....the backend server is down. please try again later!!');
      }
    })
  }

  return (
    <div className='login-body'>
      <form className='login-form' onSubmit={submitHandler}>
        <h5>Login</h5>
        <div className='login-input'><TextField label="Username" variant="outlined" type="text" value={username} onChange={event => setUsername(event.target.value)} /></div>
        <div className='login-input'><TextField label="Password" variant="outlined" type="password" value={password} onChange={event => setPassword(event.target.value)} /></div>
        <Button variant="contained" type="submit">Login</Button>
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  )
}

export default Login;