import React, { createContext, useState, useEffect } from 'react';
import LoginContext from './loggedInContext';
import { storeData, getData } from '@/scripts/store';

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await getData('loggedIn');
      setLoggedIn(Boolean(status));
    };

    checkLoginStatus();
  }, []); // Run only on component mount

  const login = async () => {
    console.log('Logging in...');
    await storeData('true', 'loggedIn');
    setLoggedIn(true);
  };

  const logout = async () => {
    console.log('Logging out...');
    await storeData('false', 'loggedIn');
    setLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ loggedIn, logIn: login, logOut: logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
