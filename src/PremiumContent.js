import React from 'react';
import { getUser, resetUserSession } from './service/AuthService';
import {Button } from '@material-ui/core';

const PremiumContent = (props) => {
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const logoutHandler = () => {
    resetUserSession();
    props.history.push('login');
  }
  return (
    <div className='dash-body'>
      Hello {name}! <br /> This will be our dashboard
      <Button variant="contained" onClick={logoutHandler}>Logout</Button>
    </div>
  )
}

export default PremiumContent;