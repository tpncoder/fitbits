// loggedInContext.ts
import React from 'react';

const LoginContext = React.createContext({
  loggedIn: false, 
  logOut: () => {},
  logIn: () => {}
});

export default LoginContext;
