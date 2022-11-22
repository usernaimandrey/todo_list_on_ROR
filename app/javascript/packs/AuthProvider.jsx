import React, { useState } from 'react';
import authContext from './context';

const AuthProvider = ({ children }) => {
  const [logedIn, setLogin] = useState(false);
  const logIn = () => setLogin(true);
  const logOut = () => {
    localStorage.removeItem('userData');
    setLogin(false);
  };

  return (
    <authContext.Provider value={{ logIn, logOut, logedIn }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;